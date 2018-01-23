const launcher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

function Sbi() {

    this.url = 'https://www.netbk.co.jp/wpl/NBGate';
}

Sbi.prototype.launchChrome = function() {

    return launcher.launch({
        startingUrl: 'about:blank',
        chromeFlags : ['--headless', '--disable-gpu']
    });
};

Sbi.prototype.login = function() {
    var self = this;

    this.launchChrome().then(
        (chrome) => {
            CDP(
                {port: chrome.port},
                (client) => {

                    const { Network, Page, DOM, Runtime } = client;

                    // setup handlers
                    Network.requestWillBeSent(() => {

                        //console.debug(params.request.url);
                    });
                    Page.loadEventFired(async () => {

                        console.log('loadEventFired');

                        let obj = await Page.getNavigationHistory();

                        let currentIndex = obj.currentIndex;
                        let entries = obj.entries;
                        let topPageUrl = 'https://www.netbk.co.jp/wpl/NBGate/i010101CT';
                        if(entries[currentIndex].url == topPageUrl) {

                            console.log(`Current page(index="${currentIndex}") url="${topPageUrl}", title="${entries[currentIndex].title}"!!`);
                            client.close();

                            return ;
                        }

                        console.log('Call Runtime.evaluate for username');
                        await Runtime.evaluate({
                            expression: `document.querySelector('#side > form > div > div.sideformArea input[name="userName"]').value = "${process.env.sbi_login_user_name}"`
                        });
                        console.log('Call Runtime.evaluate for loginPwdSet');
                        await Runtime.evaluate({
                            expression: `document.querySelector('#side > form > div > div.sideformArea input[name="loginPwdSet"]').value = "${process.env.sbi_login_user_password}"`
                        });

                        await Runtime.evaluate({

                            expression : 'document.querySelector(\'#side > form > div > div.loginBtn > div:nth-child(1) > input[type="image"]\').click()'
                        });

                        // DOM.getDocument(async function (err, params) {
                        //     if(err) {
                        //
                        //         console.error('Error DOM.getDocument', err);
                        //         client.close();
                        //         return ;
                        //     }
                        //     console.log(`params.root.nodeId: "${params.root.nodeId}"`);
                        //
                        //     await DOM.setAttributeValue({
                        //         nodeId: 145,
                        //         name: 'value',
                        //         value: 'e_fujikawa'
                        //     });
                        //     await DOM.setAttributeValue({
                        //         nodeId: 146,
                        //         name: 'value',
                        //         value: 'MnIsA5Fk'
                        //     });
                        //
                        //     DOM.querySelectorAll({
                        //
                        //         'nodeId': params.root.nodeId,
                        //         'selector': '#side > form > div > div.sideformArea input[name=\'loginPwdSet\']'
                        //     }, function(err, params) {
                        //
                        //         if(err) {
                        //
                        //             console.error('Error DOM.querySelectorAll', err);
                        //             client.close();
                        //         }
                        //
                        //         params.nodeIds.forEach((nodeId) => {
                        //
                        //             DOM.getAttributes({
                        //                 nodeId: nodeId
                        //             }, (err, params) => {
                        //
                        //                 if (err) {
                        //
                        //                     console.error(params);
                        //                     client.close();
                        //                     return;
                        //                 }
                        //
                        //                 let attributes = {};
                        //                 let attrCount = params.attributes.length / 2;
                        //                 for(let i = 0; i < attrCount; i++) {
                        //
                        //                     let key = params.attributes[i * 2];
                        //                     let value = params.attributes[i * 2 + 1];
                        //                     attributes[key] = value;
                        //                 }
                        //                 console.log(attributes);
                        //
                        //                 console.log(params);
                        //                 client.close();
                        //             });
                        //         });
                        //     });
                        // });
                    });

                    // enable events then start!
                    Promise.all([
                        Network.enable(),
                        Page.enable(),
                        DOM.enable(),
                        Runtime.enable()
                    ]).then(() => {

                        console.log(`Page, Network Protocol has been enabled, and navigate to "${self.url}"`);
                        return Page.navigate({url: self.url});
                    }).catch((err) => {

                        console.error(err);
                        client.close();
                    });
                }
            );
        }
    );
};

module.exports = Sbi;
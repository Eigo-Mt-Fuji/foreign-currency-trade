const launcher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

function Sbi() {

    this.url = 'https://www.netbk.co.jp/wpl/NBGate/i010002CT';
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

                    const { Network, Page } = client;

                    // setup handlers
                    Network.requestWillBeSent(() => {

                        //console.debug(params.request.url);
                    });

                    Page.loadEventFired(() => {

                        console.log('loadEventFired');
                        console.log(JSON.stringify(arguments));
                        // DOM.querySelectorAll({
                        //     nodeId : params.root.nodeId,
                        //     selector : 'a'
                        // }, (error, params) => {
                        //     if (error){
                        //         console.log(params);
                        //         launcher.kill();
                        //         return;
                        //     }
                        client.close();
                    });

                    // enable events then start!
                    Promise.all([
                        Network.enable(),
                        Page.enable()
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
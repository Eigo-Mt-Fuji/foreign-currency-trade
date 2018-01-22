'use strict';

// const config = require('env-yaml');
// config.load({path: '.env.yml'});

const { IncomingWebhook } = require('@slack/client');
const webHook = new IncomingWebhook(process.env.slack_webhook_endpoint);
//const webHook = new IncomingWebhook('https://hooks.slack.com/services/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');
module.exports.runCron = function (event, context) {
    webHook.send('Hello　Scheduled!!!', function(err, res) {

        let time = new Date();

        if (err) {

            console.log('Error: ${time}', err);
        } else {

            console.log(`Your cron function "${context.functionName}" ran at ${time}`);
            console.log('Success: ${time}', res);
        }
    });

};


'use strict';

const { IncomingWebhook } = require('@slack/client');
const webHook = new IncomingWebhook(process.env.slack_webhook_endpoint);
module.exports.runCron = function (event, context) {
    webHook.send('Hello　Scheduled!!!', function(err, res) {

        let time = new Date();

        if (err) {

            console.log(`Failure @ "${time.toUTCString()}"`, err);
        } else {

            console.log(`Your cron function "${context.functionName}" ran at ${time}`);
            console.log(`Success @ "${time.toUTCString()}"`, res);
        }
    });

};

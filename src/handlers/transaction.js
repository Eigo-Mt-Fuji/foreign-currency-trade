const serverless = require('serverless-http');
const express = require('express');
const app = express();

var bodyParser = require('body-parser');


const transaction = require('../routes/transaction') ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/transaction', transaction);

module.exports.main = serverless(app);


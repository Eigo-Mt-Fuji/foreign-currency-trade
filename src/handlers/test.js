'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();

import test from '../routes/test';
import hoge from '../routes/hoge';


app.use('/hogehoge', hoge);
app.use('/test', test);

module.exports.main = serverless(app);


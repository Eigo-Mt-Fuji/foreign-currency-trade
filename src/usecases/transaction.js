'use strict'

const aws = require('aws-sdk');
const util = require('util');

/**
 * constructor
 * @param bucketName
 * @param basePath
 */
function Transaction(bucketName, basePath) {

    this.bucketName = bucketName;
    this.basePath = basePath;
};

Transaction.prototype.save = function(key, contents) {

    var s3 = new aws.S3({apiVersion: '2006-03-01', region: 'us-east-1'});
    var promise = s3.putObject({
        Bucket: this.bucketName,
        Key: util.format('%s/%s', this.basePath, key),
        Body: JSON.stringify(contents),
        ServerSideEncryption: 'AES256'
    }).promise();

    promise.then(function() {

        console.log('Success');
    }).catch(function(err) {

        console.log(err);
    });

    return promise;
};

/**
 * get
 * @param key
 * @param contents
 */
Transaction.prototype.get = function(key) {

    var s3 = new aws.S3({apiVersion: '2006-03-01', region: 'us-east-1'});
    var promise = s3.getObject({
        Bucket: this.bucketName,
        Key: util.format('%s/%s', this.basePath, key)
    }).promise();

    promise.then(function(data) {

        console.log(data.Body.toString());
    }).catch(function(err) {

        console.log(err);
    });

    return promise;
};

module.exports = Transaction;
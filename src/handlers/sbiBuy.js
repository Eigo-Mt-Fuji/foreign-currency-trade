const Sbi = require('../usecases/sbi');

module.exports.sbiBuy = function () {
    console.log('SbiBuy');
    let sbi = new Sbi();

    sbi.login();
};


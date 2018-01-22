const Transaction = require('../usecases/transaction');

const express = require('express');
const router = express.Router();

var useCase = new Transaction('foreign-currency-trade-d-serverlessdeploymentbuck-hqoo7u3wymd1', 'transactions');

router.get('/:name', function(req, res) {

    let name = req.param.name;

    useCase.get(name).then(function(data){

        res.status(200);
        res.header('Content-Type', 'application/json');
        res.send(data.Body.toString('utf-8'));
    }).catch(function(err) {

        res.status(500);
        res.send(JSON.stringify(err));
    });
});
router.post('/:name', function(req, res) {
    let name = req.param.name;

    useCase.save(name, req.body).then(function(){

        res.status(200);
        res.send(JSON.stringify({'message':'Success!!'}));
    }).catch(function(err) {

        res.status(500);
        res.send(JSON.stringify(err));
    });
});

module.exports = router;
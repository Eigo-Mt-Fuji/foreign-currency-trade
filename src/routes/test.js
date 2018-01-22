const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

    res.status(200);
    res.send(JSON.stringify({'message':'Test'}));
});

export default router;
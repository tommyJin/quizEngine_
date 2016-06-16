/**
 * Created by tommy on 2016/6/16.
 */
var express = require('express');
var router = express.Router();


/* get session token  */
router.get('/get', function(req, res, next) {
    var token ="tokenhere";
    res.json(token);
});


/* set session token  */
router.get('/set', function(req, res, next) {
    
});





module.exports = router;
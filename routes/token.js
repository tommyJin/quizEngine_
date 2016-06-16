/**
 * Created by tommy on 2016/6/16.
 */
var express = require('express');
var router = express.Router();

// Use the session middleware
// express.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));



/* get session token  */
router.get('/get', function(req, res, next) {
    var token ="tokenhere";
    res.json("get token ok")
});



/* set session token  */
router.get('/set', function(req, res, next) {
    
    res.json("set token ok")
});





module.exports = router;
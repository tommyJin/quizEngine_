var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.get('/logout',  function (req, res, next) {
    console.log("clear cookie");
    res.json("Logout Success!");
});



module.exports = router;
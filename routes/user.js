var express = require('express');
var router = express.Router();

/* GET user profile. */
router.get('/', function(req, res, next) {
  res.render('user');
});

router.get('/setting', function (req,res,next) {
  res.render('setting');
});

router.get('get',function (req,res,next) {
  var user = {'username':"student",'name':'zhangsan'};
  res.json(user);
});

module.exports = router;

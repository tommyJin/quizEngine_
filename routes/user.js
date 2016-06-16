var express = require('express');
var router = express.Router();

/* GET user profile. */
router.get('/', function(req, res, next) {
  res.render('user');
});

module.exports = router;

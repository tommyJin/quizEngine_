/**
 * Created by tommy on 2016/6/18.
 */
var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
    res.render('login');
});

router.get('/index',function (req,res,next) {
   res.render('index'); 
});

/* GET user profile. */
router.get('/login', function(req, res, next) {
    res.render('login');
});


router.get('/user', function (req,res,next) {
    res.render('user');
});

router.get('/quiz', function (req,res,next) {
    res.render('quiz');
});

router.get('/quiz/get', function (req,res,next) {
    res.render('quiz_get');
});

router.get('/quiz/setting', function (req,res,next) {
    res.render('setting');
});

router.get('/quiz/question',function (req,res,next) {
   res.render('quiz_question'); 
});

module.exports = router;

/**
 * Created by tommy on 2016/5/26.
 */

var express = require('express');
var http = require("http");
var request = require('request');
var url = require("url");
var session = require('express-session');

var base = "http://localhost:8080/";

var app = express();
var router = express.Router();

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

/* GET use req.query.para
   POST use req.body.para
. */

router.get('/token/get', function (req, res, next) {
    var user = req.session.user;
    console.log("user session in token get=: %j",req.session.user);
    console.log("user=" + user);
    res.json(user);
});

router.get('/user/get', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var url = base + "student/user/get?id="+paras.id+"&token="+paras.token;
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});

router.post('/user/update',function (req,res,next) {
    var user = req.session.user;
    console.log('user in session= %j',user);
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.username = user.username;
        paras.token = user.token;
        var url = base + "student/user/update?paras.id="+paras.id+"&paras.name="+name+"&paras.email="+email+"&paras.password="+password+"&id="+paras.id+"&token="+paras.token;
        request.post(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                if (parsed.status == 200) {
                    data.id = paras.id;
                    data.token = paras.token;
                    data.username = paras.username;
                    data.name = name;
                    //set session user here
                    req.session.user = data;
                    console.log("user session in login=: %j",req.session.user);
                }
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});

router.get('/quiz',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.level_id = req.query.level_id;
        paras.category_id = req.query.category_id;


        var url = base + "student/quiz";
        
        console.log("paras="+paras+" and flag="+(typeof paras === 'object'));
        
        request({url:url, qs :paras}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});


router.get('/quiz/add',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var level_id = req.query.level_id;
        var category_id = req.query.category_id;

        var url = base + "student/quiz/add?paras.name="+name+"&paras.content="+content+"&paras.question_level_id="+level_id+"&paras.question_category_id="+category_id+"&id="+paras.id+"&token="+paras.token;
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});

router.get('/quiz/get', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var quiz_id = req.query.id;

        var url = base + "student/quiz/get?&quiz_id="+quiz_id+"&id="+paras.id+"&token="+paras.token;
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});


router.get('/quiz/get', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var quiz_id = req.query.id;

        var url = base + "student/quiz/get?&quiz_id="+quiz_id+"&id="+paras.id+"&token="+paras.token;
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                res.json(parsed);
            }else {
                data.errormsg = "Something unknown happened!";
                data.status = 400;
                res.json(data);
            }
        });
    }else {
        data.errormsg = "Please login first!";
        data.status = 400;
        res.json(data);
    }
});


router.get('/setting', function (req,res,next) {
    res.json();
});



module.exports = router;

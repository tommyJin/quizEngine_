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
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var url = base + "session/student_login?username="+username+"&password="+password;
    var data = {};
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var parsed = JSON.parse(body);
            var rs = parsed.data;
            console.log("status:" + parsed.status);
            console.log("data:" + parsed.data);
            if (parsed.status == 200) {
                data.id = rs.id;
                data.token = rs.token;
                data.username = rs.username;
                data.name = rs.name;
                //set session user here
                req.session.user = data;
                console.log("user session in login=: %j",req.session.user);
            }
            data = parsed;
            console.log("data in res=: %j",data);
            res.json(data);
        }
    });
});

router.get('/logout', function (req, res, next) {
    req.session = null;
    // console.log("user session in logout=: %j",req.session.user);
    res.json(req.session==null?"Logout success!":"Logout failed!");
});

router.get('/test_session', function (req,res,next) {
    var user = req.session.user;
    console.log("user session in test session=: %j",user);
    res.json(user);
});

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
        var id = user.id;
        var token = user.token;
        var url = base + "student/user/get?id="+id+"&token="+token;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:" + parsed.data);
                var rs = parsed.data;
                if (parsed.status == 200) {
                    data = rs;
                    console.log("return user info=: %j",data);
                }else {
                    data.errormsg = rs;
                }
            }
        });
    }else {
        data.errormsg = "Please login first!";
    }

    res.json(data);
});

router.post('/user/update',function (req,res,next) {
    res.json();

});

router.get('/quiz',function (req,res,next) {
    res.json();
});

router.get('/quiz/get', function (req,res,next) {
   res.json(); 
});

router.get('/setting', function (req,res,next) {
    res.json();
});



module.exports = router;

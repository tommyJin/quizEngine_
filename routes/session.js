var express = require('express');
var http = require("http");
var request = require('request');
var url = require("url");
var session = require('express-session');

var router = express.Router();

var base = "http://localhost:8080/";

router.get('/',function (req,res,next) {
    res.render('login');
});

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
    req.session.user = null;
    // console.log("user session in logout=: %j",req.session.user);
    var data = {};
    data.status = 200;
    data.data = (req.session.user==null?"Logout success!":"Logout failed!");
    console.log(req.session.user);
    res.json(data);
});


module.exports = router;
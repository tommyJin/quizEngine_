/**
 * Created by tommy on 2016/5/26.
 */

var express = require('express');
var http = require("http");
var request = require('request');
var url = require("url");
var session = require('express-session')

var base = "http://localhost:8080/";

var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    var url_login = base+"session/login?username=admin&password=admin";
    request(url_login, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var parsed = JSON.parse(body);
            console.log("status:"+parsed.status);
            console.log("data:"+parsed.data);
            if (parsed.status==200){
                var data = parsed.data;
                console.log("username:"+data.user.username);
            }
        }
    });
    
    res.send('respond with a url:'+url_login);
});




module.exports = router;

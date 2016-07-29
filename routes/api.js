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
        paras.category_id = req.query.category_id;
        paras.topic_id = req.query.topic_id;
        paras.level_id = req.query.level_id;
        paras.name = req.query.name;
        paras.number = req.query.number;
        paras.answered = req.query.answered;
        paras.showanswer = req.query.showanswer;

        var url = base + "student/quiz/add?id="+paras.id+"&token="+paras.token+"&paras.number="+paras.number+"&paras.answered="+paras.answered+"&paras.showanswer="+paras.showanswer;
        if (paras.level_id!=null && paras.level_id.length>0){
            url += "&paras.question_level_id="+paras.level_id;
        }
        if (paras.name!=null && paras.name.length>0){
            url += "&paras.name="+paras.name;
        }
        if (paras.category_id!=null && paras.category_id.length>0){
            url += "&paras.question_category_id="+paras.category_id;
        }
        if (paras.topic_id!=null && paras.topic_id.length>0){
            url += "&paras.question_topic_id="+paras.topic_id;
        }
        console.log("url="+url);
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

router.get('/quiz/delete', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.quiz_id = req.query.quiz_id;

        var url = base + "student/quiz/delete?id="+paras.id+"&token="+paras.token+"&quiz_id="+paras.quiz_id;

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:%j",parsed.data);
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

router.get('/quiz/retake', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.quiz_id = req.query.quiz_id;

        var url = base + "student/quiz/retake?id="+paras.id+"&token="+paras.token+"&quiz_id="+paras.quiz_id;

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:%j",parsed.data);
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

router.get('/quiz/question', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var quiz_id = req.query.quiz_id;
        var size = req.query.size;

        var url = base + "student/quizquestion?id="+paras.id+"&token="+paras.token+"&quiz_id="+quiz_id+"&size="+size;

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:%j",parsed.data);
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

router.get('/quiz/finish', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        var quiz_id = req.query.quiz_id;

        var url = base + "student/answer/finish?id="+paras.id+"&token="+paras.token+"&quiz_id="+quiz_id;

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:%j",parsed.data);
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

router.get('/quiz/saveAnswer', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.quiz_id = req.query.quiz_id;
        paras.quiz_question_id = req.query.quiz_question_id;
        paras.answer = req.query.answer;
        paras.mark = req.query.mark;
        paras.quiz_record_id = req.query.quiz_record_id;

        var url = base + "student/answer";

        request({url:url, qs :paras}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                var parsed = JSON.parse(body);
                console.log("status:" + parsed.status);
                console.log("data:%j",parsed.data);
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

router.get('/quiz/question/maxSize', function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.category_id = req.query.category_id;
        paras.topic_id = req.query.topic_id;
        paras.level_id = req.query.level_id;
        paras.answered = req.query.answered;

        var url = base + "student/quizquestion/maxSize?id="+paras.id+"&token="+paras.token+"&answered="+paras.answered;
        
        if(paras.level_id!=null && paras.level_id.length>0){
            url+= "&level_id="+paras.level_id;
        }
        if(paras.topic_id!=null && paras.topic_id.length>0){
            url+= "&topic_id="+paras.topic_id;
        }
        if(paras.category_id!=null && paras.category_id.length>0){
            url+= "&category_id="+paras.category_id;
        }
        
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

router.get('/question/categories',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;

        var url = base + "questioncategory?id="+paras.id+"&token="+paras.token;
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

router.get('/question/topics',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;
        paras.category_id = req.query.category_id;

        var url = base + "questiontopic?id="+paras.id+"&token="+paras.token+"&category_id="+paras.category_id;
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

router.get('/question/levels',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;

        var url = base + "questionlevel?id="+paras.id+"&token="+paras.token;
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

router.get('/question/types',function (req,res,next) {
    var user = req.session.user;
    var data = {};
    if(user){
        var paras = {};
        paras.id = user.id;
        paras.token = user.token;

        var url = base + "questiontype?id="+paras.id+"&token="+paras.token;
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

module.exports = router;

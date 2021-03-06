var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var view = require('./routes/view');
var login = require('./routes/session');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// //session set
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "user"
  // store: new RedisStore()
}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/public'));



//session filter
app.use(function (req, res, next) {
    var url = req.url;
    // console.log("url="+url+" equals to /:"+(url=="/"));
    if ( (url=="/") || url.indexOf( '/view/')>-1 || url.indexOf('/api/') >-1 ) {
        var user = req.session.user;
        if (user) {
            if (url=="/"){
                return res.redirect('/view/index');
            }else {
                next();
            }
        }
        else {
            return res.redirect('/session');
        }
    }
    else {
        next();
    }
});

app.use('/', routes);
//view router
app.use('/view', view);
//api router
app.use('/api',api);
app.use('/session', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

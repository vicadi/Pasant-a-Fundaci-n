var express = require('express');
var app = express();

//modules
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
//models
var models = require('./models');

var fundacion = require('./routes/fundacion');
var admin = require('./routes/admin');
var pagina = require('./routes/pagina');
var menu = require('./routes/menu');
var user = require('./routes/user');
var slider = require('./routes/slider');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '200mb'}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Sesiones y cokies
app.use(cookieParser());
app.use(session({secret: '1234567'}));
app.use(flash());   

//routes
app.use('/user/', user);
app.use('/admin/menu', menu);
app.use('/admin/pagina', pagina);
app.use('/admin/slider',slider);
app.use('/admin', admin);
app.use('/', fundacion);

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

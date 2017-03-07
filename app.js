const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
// to use our questions router, we have to load it
// into a variable with the require function
// to load one of your own file modules, give require
// the relative path to the file 👇
const questions = require('./routes/questions')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 👇 bodyParser middleware can be used to parse json
app.use(bodyParser.json());
// 👇 it can also be used to parse form-data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 👇 will transpile our scss files into css files
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// app.use
// - first argument: beginning url for routes
// - second argument: middleware (or, router) object
app.use('/questions', questions)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 👇 app.js is being exported as a module
// we can't start this server by running the command `node app.js`
// the file that requires app.js would be the entry to our node server
module.exports = app;

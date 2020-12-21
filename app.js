var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {config} = require('./src/helpers/configs');

var app = express();


const URI = config.URI;


const connectDB = async () => {
  await mongoose.connect(URI,{
     useUnifiedTopology: true,
     useNewUrlParser: true,
     }, (err) => {
     if(err){
         console.log("error can not connect!!!");
         throw err;
     }
     console.log("------------------Connected mongo Atlas!----------------------");
 })
};

connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

console.log(1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

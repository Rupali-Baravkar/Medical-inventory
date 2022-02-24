var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require('express-handlebars');
var session = require('express-session');

// database
var db = require('./Config/connection');

//const mysql = require('mysql');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');


var app = express();

//for fileUpload
var fileUpload = require('express-fileupload');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'hbs' );
//app.set('view engine', 'hbs');

//setting new layout and partials
var hbs = handlebars.create({
  layoutsDir: path.join(__dirname, 'views', 'layout'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'layout',
  extname: '.hbs'
});

app.engine( 'hbs', hbs.engine );


//give mysql connection export


//app.engine('hbs', hbs({}))
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create session
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 600000 },
}));


//flash message middleware
app.use(function(req,res,next){ 
  res.locals.message = req.session.message;
  delete req.session.message;
  next(); 
});

//for database
app.use(function(req, res, next) {
  req.db = db;
  next();
});

//for file upload
app.use(fileUpload());

app.use('/admin', adminRouter);
app.use('/', usersRouter);

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

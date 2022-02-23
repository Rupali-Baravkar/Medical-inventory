var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require('express-handlebars');

const mysql = require('mysql');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');


var app = express();

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




//app.engine('hbs', hbs({}))
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: 'localhost',
  port: 3306, 
  database: 'demo',
  user: 'root',
  password: '123456789',
});

con.connect((err) => {
  if(err){
    console.log(err);
    return;
  }
  console.log('Connection established');

  
});




// con.query("SELECT * FROM demo.new", function (err, result, fields) {
//   if (err){
//       console.log(err);}
//    else
//       console.log(result);
// });





// con.end();

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

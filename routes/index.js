//var db = require('connection');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Medical inventory' });
  res.render('dashboard');
});

router.get('/Login', function(req, res, next){
  res.render('Login');
});


router.get('/admindash', function(req, res, next){
  res.render('admindash')
})
router.get('/signup', function(req, res, next){
  res.render('admindash')
})

// Handling user signup
/*router.post("/signup", function (req, res) {
  var username = req.body.txt
  var email = req.body.email
  var password = req.body.pswd
  User.Login(new User({ username: username }),
          password, function (err, user) {
      if (err) {
          console.log(err);
         res.redirect('/admindash');
     // }
 // });
});*/

router.post("/signup", function(req, res){
  console.log("redirecting");
  res.render('admindash');
})

/*router.post('/login', (req, res) => {

  function doLogin(userData) {
    return new Promise(async (resolve, reject) => {

db.query("SELECT * FROM demo.new", function (err, result, fields) {
  if (err){
      console.log(err);}
   else
      console.log(result);
});

    }
  });
  */


module.exports = router;

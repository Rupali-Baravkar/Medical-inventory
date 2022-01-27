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

module.exports = router;

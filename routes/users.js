var express = require('express');
const { getdb, response } = require('../app');
var router = express.Router();
const mysql = require('mysql');



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



/* GET users listing. */
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Medical inventory' });
  let products = [
    {
      id: 1,
      name: 'Nicip Plus Tablet',
      price: 100,
      description: "Antibiotics",
      image: "https://cdn.slidesharecdn.com/ss_thumbnails/nicipplustablet-190826170348-thumbnail-4.jpg?cb=1566839123"
    },
    {
      id: 2,
      name: 'Cefakind-500',
      price: 200,
      description: "Antibiotics",
      image: "https://newassets.apollo247.com/pub/media/catalog/product/c/e/cef0102.jpg"
    },


    {
      id: 3,
      name: 'Montal LC',
      price: 100,
      description: "Antibiotics",
      image: "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2018/07/8-8.jpg"
    },

    {
      id: 4,
      name: 'Ecosprine 750mg',
      price: 100,
      description: "Antibiotics",
      image: "https://asset20.ckassets.com/blog/wp-content/uploads/sites/5/2018/06/Ecosprin.jpg"
    },

    {
      id: 5,
      name: 'Cough Syrup',
      price: 100,
      description: "Herbion Naturals Cough Syrup with Stevia, Green, Sugar Free, 5.0 Fl Oz",
      image: "https://m.media-amazon.com/images/I/51McQduO3cL._AC_.jpg"
    },
  ]
  res.render('user/dashboard', {products: products});

});

router.get('/Login', function(req, res){
  // con.query("SELECT * FROM demo.new", function (err, result, fields) {
  //   if (err){
  //       console.log(err);}
  //    else
  //       console.log(result);
  // });

  // con.end();

  res.render('user/Login' , {message: false});

});

router.post('/Login', function(req, res){
  console.log(req.body)
  // // function dosignup(userdata){
  // //   return new 
  // }
  var message = [];
  var sql = "insert into login(uname, email, pass) values ?"
  var values = [[req.body.user, req.body.email, req.body.pswd]]
  con.query(sql, [values], function(err, result){
    if(err) {
     console.log(err)
    }
    else{
    console.log(result.affectedRows)
    // message = [{
    //   type: 'Success',
    //     intro: '! ',
    //     text: 'User Registration Successfull.'
    // }];
    
    }
    
  })
 
  // con.end()
  res.render('user/Login', {message: true});

});
router.get('/checkout', function(req, res){
  res.render('user/checkout');
});


router.get('/paymentsu', function(req, res){
  res.render('user/paymentsu');
});
module.exports = router;

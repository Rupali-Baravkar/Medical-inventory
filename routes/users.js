const { response } = require('express');
var express = require('express');
//const { response } = require('../app');
var router = express.Router();
//const mysql = require('mysql');

// var db = require('../Config/connection');




/* GET users listing. */
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Medical inventory' });

  //checking for session
 let user = req.session.user;
console.log(user);
  //fetch data from database
  function getProducts() {
    return new Promise(function (resolve, reject) {
      req.db.query('SELECT * FROM products', function (err, result) {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    });
  }

  getProducts().then(function (result) {
    console.log(result);
    res.render('user/dashboard', {
      products: result,
      user: user
    });
  }).catch(function (err) {
    console.log(err);
  });
});

//   res.render('user/dashboard', {products: products, user: user});

// });

router.get('/Login', function(req, res){
 if(req.session.loggedIn){
   res.redirect('/');
 }else{
 
  res.render('user/login');
 }
});

router.post('/Login', function(req, res){
 


  
  console.log(req.body)
  //insert data into database 
  // let response ={}
  // db.query('INSERT INTO user SET ?', req.body, function(err, result){
  //   if(err) throw err;
  //   response.status = "success";
  //   response.message = "User added successfully";
  //   console.log(response);
  //   //res.json(response);

  // // });
  // });
  // res.redirect('/');
  
  function userRegister(userData){
    return new Promise(function(resolve, reject){
      //let response={}
      console.log(userData)
      
      req.db.query('INSERT INTO user SET ?', userData, function(err, result){
        if(err){
          throw err;
        }else{
          req.session.message={
            type: 'success',
            text: 'User Registered successfully'

          }
          res.redirect('/Login');
          //console.log(req.session.message);
          console.log(result)
          resolve(result);
        }
      
      });
    
    });
  }

  userRegister(req.body).then(function(result){
    //res.json(response);
   console.log(result);

  }).catch(function(err){
   console.log(err);
  });


});

router.post('/userLogin', function(req, res){
  // login function
  console.log(req.body)
  function doLogin(userData){
    return new Promise(function(resolve, reject){
      let response={}
      if(userData.email=='admin@gmail.com' && userData.password=='admin')
      {
        function getProducts() {
          return new Promise(function (resolve, reject) {
            req.db.query('SELECT * FROM products', function (err, result) {
              if (err) {
                throw err;
              } else {
                resolve(result);
              }
            });
          });
        }
      
        getProducts().then(function (result) {
          console.log(result);
          res.render('admin/admindash', {
            admin: true,
            products: result,
          });
        }).catch(function (err) {
          console.log(err);
        });
      }
      else
      {
      req.db.query('SELECT * FROM user WHERE email = ? AND password = ?', [userData.email, userData.password], function(err, result){
        //console.log("user : " +user);
        if(result.length > 0){
          response.status = true;
          response.user = result[0];
          response.message = "User Logged in successfully";
          console.log(response);
          resolve(response);
        }else{
          response.status = false;
          response.message = "Invalid email or password";
          console.log(response);
          resolve({status: false, message: "Invalid email or password"});
        }
        // if(err) reject(err);
        // response.status = "success";
        // response.message = "User Logged In successfully";
        // console.log(response);
        // resolve(response);
      });
    }
    });
  }

  doLogin(req.body).then(function(response){
    //res.json(response);
    if(response.status){
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    }else{
      req.session.message = {
        type: 'danger',
        text: response.message
      }
      res.redirect('/Login');
    }
  }
  ).catch(function(err){
    res.json(err);
  });
});

//for user logout 
router.get('/Logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

router.get('/checkout', function(req, res){
  res.render('user/checkout');
});


router.get('/paymentsu', function(req, res){
  res.render('user/paymentsu');
});

//add to cart
router.get('/addtocart', (req, res)=>{
  res.render('user/addtocart');
})
module.exports = router;

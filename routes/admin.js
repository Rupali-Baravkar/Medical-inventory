var express = require('express');
var router = express.Router();





router.get('/', function (req, res, next) {
  //taking data from database
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
  // res.render('admin/admindash', {
  //   admin: true,
  //   products: products
  // });
});


router.get('/add-product', function (req, res, next) {
  res.render('admin/add-products', {
    admin: true
  });
});

// adding product
router.post('/add-product', function (req, res, next) {
  // console.log(req.body);
  // console.log(req.files.pimage);
  //function to insert product into database
  function addProduct(product) {
    return new Promise(function (resolve, reject) {
      if (!req.files) {
        console.log("No file uploaded");
        return;
      } else {
        console.log(req.files.pimage);
        let image = req.files.pimage;
        let imageName = Date.now() + image.name;
        image.mv('./public/images/' + imageName, function (err) {
          if (err) {
            console.log(err);
          }
        });

        product.pimage = imageName;
        console.log(product);

        req.db.query('INSERT INTO products SET ?', product, function (err, result) {
          if (err) throw err;
          req.session.message={
            type: 'success',
            text: 'Product added successfully'
          }
          res.redirect('/admin/add-product');
          resolve(result);
         // console.log(result);
        });

      }

    });
  }

  addProduct(req.body).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
  //res.redirect('/');
});

module.exports = router;
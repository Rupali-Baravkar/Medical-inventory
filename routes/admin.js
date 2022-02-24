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
   // console.log(result);
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
       // console.log(product);

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

//edit produt page display
router.get('/edit-product/:id', function (req, res, next) {
  let ProductId = req.params.id;
  function getProduct() {
    return new Promise(function (resolve, reject) {
      req.db.query('SELECT * FROM products WHERE pid = ?', ProductId, function (err, result) {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    });
  }

  var product = getProduct(ProductId).then(function(result){
    console.log(result);
    res.render('admin/edit-product', {
      admin: true,
      product: result[0]
    });
  }).catch((err)=>{
    console.log(err);
  });
    
 
});

//update product
router.post('/edit-product/:id', function (req, res, next) {
  let ProductId = req.params.id;

  function updateProduct(product, ProductId) {
    return new Promise(function (resolve, reject) {
      if (req.files) {
       
        console.log(req.files.pimage);
        let image = req.files.pimage;
        let imageName = Date.now() + image.name;
        image.mv('./public/images/' + imageName, function (err) {
          if (err) {
            console.log(err);
          }
        });
        product.pimage = imageName;
      }

        req.db.query('UPDATE products SET ? WHERE pid = ?', [product, ProductId], function (err, result) {
          if (err) throw err;
          req.session.message={
            type: 'success',
            text: 'Product updated successfully'
          }
          res.redirect('/admin');
          resolve(result);
        });
      // }
    });
  }

  updateProduct(req.body, ProductId).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
});


//delete product
router.get('/delete-product/:pid', function (req, res, next) {
  let ProductId = req.params.pid;
  //console.log(ProductId);
  function deleteProduct(ProductId) {
    return new Promise(function (resolve, reject) {
      req.db.query('DELETE FROM products WHERE pid = ?', ProductId, function (err, result) {
        if (err) {
          throw err;
        } else {
          req.session.message={
            type: 'success',
            text: 'Product deleted successfully'
          }
          res.redirect('/admin');
          resolve(result);
        }
      });

    });
  }

  deleteProduct(ProductId).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });


});


//user page
router.get('/user-info', function (req, res, next) {
  // get user data from database
  function getUser() {
    return new Promise(function (resolve, reject) {
      req.db.query('SELECT * FROM user', function (err, result) {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    });
  }

  getUser().then(function (result) {

  res.render('admin/user-info', {
    admin: true,
    user: result
  });
  }).catch(function (err) {
    console.log(err);
  });

});

//order details
router.get('/order-details', function (req, res, next) {
  res.render('admin/order-details', {
    admin: true
  });
});

router.get('/adminlogout', function(req, res){
  res.redirect('/')
})
module.exports = router;
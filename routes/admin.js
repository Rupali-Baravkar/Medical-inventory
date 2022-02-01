var express = require('express');
var router = express.Router();





router.get('/', function(req, res, next){
  let products = [
    {
      id: 1,
      name: 'Dolo 600mg',
      price: 100,
      description: "Antibiotics",
      image: "https://medicaldawa.in/wp-content/uploads/2021/02/dolo-500.jpg"
    },
    {
      id: 2,
      name: 'Dolo 600mg',
      price: 100,
      description: "Antibiotics",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
  ]
  res.render('admin/admindash', {admin: true, products: products});
})

router.get('/add-product', function(req, res, next){
  res.render('admin/add-products', {admin: true});
});

module.exports = router;

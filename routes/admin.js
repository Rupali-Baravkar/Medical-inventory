var express = require('express');
var router = express.Router();





router.get('/', function(req, res, next){
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
      price: 100,
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
  res.render('admin/admindash', {admin: true, products: products});
})

router.get('/add-product', function(req, res, next){
  res.render('admin/add-products', {admin: true});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var _ = require('underscore');

var mongoose = require('mongoose');
var products = require('../models/products.js');
var wishilist = require('../models/wishilist.js');

/* GET /products listing */
router.get('/', function(req, res, next) {
  products.find({}, function(err, products){
    if( err ) throw err;

    var ids_products = _.map(products, function(e){ return e._id; });
    var new_products = [];
    wishilist.find( { 'id_product': { $in: ids_products } }, function(errW, wishilists){
      if( errW ) throw errW;

      for(var key in products){
        var product  = products[key],
            isWishilist = ( _.where(wishilists, { id_product: String(product._id) }).length )?true:false;

        var obj = {
          _id: product._id,
          name: product.name,
          alias: product.alias,
          photo: product.photo,
          wishilist: isWishilist
        };
        new_products.push(obj);
      }
      res.send( new_products )
    })
  })
});

/* Get /products specific */
router.get('/:alias', function(req, res, next) {
  products.findOne({ alias: req.params.alias },function(err, product){
    if( err ) throw err;

    wishilist.findOne( { id_product: product._id }, function(errW, wishilist) {
      var isWishilist = false, purchased = false, id_wishilist = 0;
      if(wishilist){
          isWishilist = true;
          id_wishilist = wishilist._id;
          purchased = wishilist.purchased;
      }

      var new_product = {
        _id: product._id,
        name: product.name,
        description: product.description,
        photo: product.photo,
        isWishilist: isWishilist,
        id_wishilist: id_wishilist,
        purchased: purchased
      };

      res.send( new_product )
    })
  })
});

/* POST /products */
router.post('/', function(req, res, next) {
  products.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var _ = require('underscore');

var mongoose = require('mongoose');
var wishilist = require('../models/wishilist.js');
var products = require('../models/products.js');

/* GET /wishilist/:id_user listing */
router.get('/:id_user', function(req, res, next) {
  wishilist.find({ id_user: req.params.id_user },function(err, wishilists){
    if( err ) throw err;

    var ids_products = _.map(wishilists, function(e){ return e.id_product; });

    products.find( { '_id': { $in: ids_products } }, function(errW, products){
      if( errW ) throw errW;

      var new_products = [];

      for(var key in products){
        var product  = products[key],
            purchased = ( _.where(wishilists, { id_product: String(product._id), purchased: true }).length )?true:false;

        var obj = {
          _id: product._id,
          name: product.name,
          alias: product.alias,
          photo: product.photo,
          purchased: purchased
        };
        new_products.push(obj);
      }
      res.send( new_products )
    });
  })
});

/* PUT /wishilist/:id */
router.put('/:id_user/:id_product', function(req, res, next) {
  wishilist.findOne( {id_user: req.params.id_user, id_product: req.params.id_product}, function(err, wish) {
    if (err) return next(err);

    wishilist.findByIdAndUpdate(wish._id, req.body, function (errD, post) {
      if (errD) return next(err);
      res.json(post);
    });
  });
});

/* DELETE /wishilist/:id */
router.delete('/:id_user/:id_product', function(req, res, next) {
  wishilist.findOne( {id_user: req.params.id_user, id_product: req.params.id_product}, function(err, wish) {
    if (err) return next(err);

    wishilist.findByIdAndRemove(wish._id, req.body, function (errD, post) {
      if (errD) return next(err);
      res.json(post);
    });
  });
});

/*router.delete('/:id', function(req, res, next) {
  wishilist.findByIdAndRemove(req.params.id, req.body, function (errD, post) {
    if (errD) return next(err);
    res.json(post);
  });
});*/

/* POST /wishilist */
router.post('/', function(req, res, next) {
  wishilist.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

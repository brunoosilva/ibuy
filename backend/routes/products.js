var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var products = require('../models/products.js');

/* GET /products listing */
router.get('/', function(req, res, next) {
  products.find({},function(err, products){
    if( err ) throw err;
    res.send( products )
  })
});

/* Get /products specific */
router.get('/:alias', function(req, res, next) {
  products.findOne({ alias: req.params.alias },function(err, products){
    if( err ) throw err;
    res.send( products )
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

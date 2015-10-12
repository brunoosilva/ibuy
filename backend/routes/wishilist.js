var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var wishilist = require('../models/wishilist.js');

/* GET /wishilist/:id_user listing */
router.get('/:id_user', function(req, res, next) {
  wishilist.find({ id_user: req.params.id_user },function(err, wishilist){
    if( err ) throw err;
    res.send( wishilist )
  })
});

/* PUT /wishilist/:id */
router.put('/:id', function(req, res, next) {
  wishilist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /wishilist/:id */
router.delete('/:id', function(req, res, next) {
  wishilist.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /wishilist */
router.post('/', function(req, res, next) {
  wishilist.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

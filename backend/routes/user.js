var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = require('../models/user.js');

/* Login user */
router.post('/', function(req, res, next) {
  console.log(req.body);
  user.findOne(req.body, function(err, user) {
    if( user != null ) {
      res.send( user )
    } else {
      res.status(404).send('E-mail ou senha inválidos');
    }
  });
});

/* POST /user */
router.post('/add', function(req, res, next) {
  user.create(req.body, function (err, post) {
    console.log(err);
    if (err) {
      if(err.code == 11000){ // Duplicate key
        res.status(500).send('E-mail já cadastrado');
      }
      return next(err);
    }
    res.json(post);
  });
});

module.exports = router;

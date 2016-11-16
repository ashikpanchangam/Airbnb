var express = require('express');
var jwt = require('jsonwebtoken');
var NanoTimer = require('nanotimer');

var router = express.Router();

router.get('/getData', function(req,res){

  res.status(200);
});

router.post('/searchData', function(req,res){

  res.status(200);
});




module.exports = router;

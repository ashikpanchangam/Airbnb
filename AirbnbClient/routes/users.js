var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {        /* GET users listing. */
  res.send('respond with a resource');
});

module.exports = router;
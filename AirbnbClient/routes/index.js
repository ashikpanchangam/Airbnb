var express = require('express');
var router = express.Router();
var login = require('./login');

router.get('/', function(req, res, next) {
  if(req.session.username)
    res.render('index', { title: 'Airbnb', username: req.session.username});
  else
    res.render('login');
});

router.get('/login',function(req, res, next){
  res.render('login', { title: 'Login' });
});

router.get('/register', function (req,res) {
  res.render('register');
});

router.post('/checklogin', login.checkLogin);
router.post('/register', login.register);

router.get('/logout',login.logout);

module.exports = router;

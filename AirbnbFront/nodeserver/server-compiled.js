'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _massive = require('massive');

var _massive2 = _interopRequireDefault(_massive);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inspect = require('eyespect').inspector();
var airbnb = require('airapi');
var serverSideLogic = require('./appLogic/serverSideLogic');

// Configs
// import serverConfig from './config.json';

// const connectionString = serverConfig.postgresPath; //database path
var app = module.exports = (0, _express2.default)();

app.use(_express2.default.static(__dirname + '/../public'));

app.use('/node_modules', _express2.default.static('./node_modules'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use((0, _expressSession2.default)({
  secret: 'Sid', //session secret
  saveUninitialized: false,
  resave: true
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json({
  limit: '50mb'
}));
app.use(_bodyParser2.default.urlencoded({
  limit: '50mb',
  extended: true
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
  done(null, user);
});

app.post('/login', serverSideLogic.signIn);

app.get('/dashboard', function (req, res, next) {
  res.json({ "data": req.session.data });
});

app.get('/getMessages', function (req, response, next) {

  if (req.session.token === undefined) {
    req.session.token = '446qdnlk8o0j79zjz4py8mrum';
    console.log('req.session.token: ', req.session.token);
  }

  var options = {
    method: 'GET',
    url: 'https://api.airbnb.com/v1/threads?locale=en-US&client_id=3092nxybyb0otqw18e8nh5nty&offset=0&items_per_page=10&currency=USD&role=guest',
    headers: { "X-Airbnb-OAuth-Token": req.session.token },
    json: true
  };

  (0, _request2.default)(options, function (err, res, body) {
    if (err) {
      console.log(err);
    }
    console.log('res.body: ', res.body);
    return response.json({ "threads": res.body.threads });
  });
});

app.get('/getData', function (req, res, next) {
  if (req.session.searchResults) {
    res.json(req.session.searchResults);
  } else {
    airbnb.search({
      location: 'Manila',
      checkin: '10/24/2016',
      checkout: '10/31/2016',
      guests: 2,
      page: 2
    }).then(function (searchResults) {
      // console.dir(searchResults);
      searchResults.location = 'Manila';
      searchResults.startDate = '10/24/2016';
      searchResults.endDate = '10/31/2016';
      searchResults.numGuests = 1;
      res.json(searchResults);
    });
  }
});

app.get('/viewUser/:id', function (req, response, next) {
  console.log('Params: ', req.params);
  var options = {
    method: 'get',
    url: 'https://api.airbnb.com/v2/users/' + req.params.id + '?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_show',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    json: true
  };

  (0, _request2.default)(options, function (err, res, body) {
    // console.log('user res: ', res)
    // console.log('user body: ', body)
    response.json({ 'succces': body });
  });
});

app.post('/search', serverSideLogic.search);

//     function (req, res, next) {
//
//   serverSideLogic.search;
//
//   airbnb.search({
//     location: req.body.searchVal,
//     checkin: req.body.startDate,
//     checkout: req.body.endDate,
//     guests: req.body.numGuests,
//     page: Math.round(Math.random() * 10),
//     room_types: req.body.room_types,
//     price_min: req.body.price_min,
//     price_max: req.body.price_max
//   }).then(function (searchResults) {
//
//     searchResults.location = req.body.searchVal;
//     searchResults.startDate = req.body.startDate;
//     searchResults.endDate = req.body.endDate;
//     searchResults.numGuests = req.body.numGuests;
//
//     req.session.searchResults = searchResults;
//     console.dir(searchResults.results_json.search_results[0]);
//     // console.dir(searchResults.results_json);
//     res.json(searchResults);
//   });
// });

app.post('/sendMessage', function (req, res, next) {

  // THIS NEEDS TO HAVE NEW DATA
  console.log(req.body);
  var config = { "X-Airbnb-OAuth-Token": "ay8njrze1oalc9wgyfp26e67j" };

  var data = {
    listing_id: req.body.id,
    number_of_guests: "1",
    client_id: "d306zoyjsyarp7ifhu67rjxn52tv0t20",
    currency: 'USD',
    checkout_date: "2018-04-02T22:00:00.000-0700",
    checkin_date: "2018-04-01T00:00:00.000-0700",
    locale: "en-US",
    message: req.body.message
  };

  var options = {
    method: 'post',
    url: 'https://api.airbnb.com/v1/threads/create',
    headers: {
      'X-Airbnb-OAuth-Token': 'ay8njrze1oalc9wgyfp26e67j'
    },
    body: data,
    json: true
  };
  console.log('data to be sent:', data);
  (0, _request2.default)(options, function (err, res, body) {
    console.log('body: ', body);
    if (err) {
      inspect(err, 'error at jsoning');
      console.log(err);
    };
    var headers = res.headers;
    var statusCode = res.statusCode;
  });
});

app.get('/listingInfo/:rid', serverSideLogic.getListingInfo);
// function (req, res, next) {
//   console.log(req.params);
//   // airbnb.getInfo(req.params.rid).then(function (info) {
//   //   console.log("info: ", info);
//   //   res.json(info);
//   // });
// });

app.post('/createHost', serverSideLogic.createHost);
app.post('/signup', serverSideLogic.signUp);
app.get('/getSession', serverSideLogic.getSession);
app.get('/logout', serverSideLogic.doLogout);
app.post('/editProfile', serverSideLogic.editProfile);


app.get('*', function (request, response) {
  response.sendFile(_path2.default.resolve(__dirname, '../public', 'index.html'));
});

http.listen(3000, function () {
  console.log('Hosting port: ', 3000);
});

//# sourceMappingURL=server-compiled.js.map
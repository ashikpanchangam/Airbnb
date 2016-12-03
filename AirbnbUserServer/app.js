//super simple rpc server example
var amqp = require('amqp');
var util = require('util');

var mysql = require('./db/mysql');
mysql.createConnectionPool(1000);

var admin = require('./services/admin');
var signUp = require('./services/signup');
var user = require('./services/user');

var cnn = amqp.createConnection({host:'127.0.0.1'});

console.log("---Server running---");

cnn.on('ready', function() {

    cnn.queue('signUp_queue', function (q) {
      q.subscribe(function (message, headers, deliveryInfo, m) {
        signUp.handle_signUp_queue(message, function (err, res) {
          cnn.publish(m.replyTo, res, {
            contentType: 'application/json',
            contentEncoding: 'utf-8',
            correlationId: m.correlationId
          });
        });
      });
    });


  cnn.queue('user_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      user.handle_user_queue(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('admin_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      admin.handle_admin_queue(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });
  
});
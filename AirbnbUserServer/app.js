//super simple rpc server example
var amqp = require('amqp');
var util = require('util');

var mysql = require('./db/mysql');
mysql.createConnectionPool(1000);


var signUp = require('./services/signUp');

var cnn = amqp.createConnection({host:'127.0.0.1'});


cnn.on('ready', function() {

    cnn.queue('signUp_queue', function (q) {
      q.subscribe(function (message, headers, deliveryInfo, m) {
        signUp.handle_signUp_request(message, function (err, res) {
          cnn.publish(m.replyTo, res, {
            contentType: 'application/json',
            contentEncoding: 'utf-8',
            correlationId: m.correlationId
          });
        });
      });
    });


  cnn.queue('userLogin_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_userLogin_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('becomeHost_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_becomeHost_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('deleteAccount_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_deleteAccount_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });
  
});

  
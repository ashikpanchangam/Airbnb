//super simple rpc server example
var amqp = require('amqp');
var util = require('util');

var mysql = require('./db/mysql');
mysql.createConnectionPool(1000);

var signUp = require('./services/signUp');
var host = require('./services/host');
var user = require('./services/user');

var cnn = amqp.createConnection({host:'127.0.0.1'});

console.log("---Server running---");

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

  cnn.queue('adminLogin_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_adminLogin_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });


  cnn.queue('saveHostDetails_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_saveHostDetails_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('addCreditCard_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_addCreditCard_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  cnn.queue('deleteUserAccount_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_deleteUserAccount_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

    cnn.queue('deleteHostAccount_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            signUp.handle_deleteHostAccount_request(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

    cnn.queue('editUserProfile_queue', function(g) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            user.handle_editUserProfile_request(message, function (err,res) {
                cnn.publish(m.replyTo,res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
  
});

  
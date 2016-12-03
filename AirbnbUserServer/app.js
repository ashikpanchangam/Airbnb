//super simple rpc server example
var amqp = require('amqp');
var util = require('util');

var mysql = require('./db/mysql');
mysql.createConnectionPool(1000);

var admin = require('./services/admin');
var signUp = require('./services/signUp');
var user = require('./services/user');

var cnn = amqp.createConnection({host:'127.0.0.1'});

console.log("---Server running---");

cnn.on('ready', function() {

    cnn.queue('userSignUp_queue', function (q) {
      q.subscribe(function (message, headers, deliveryInfo, m) {
          console.log("inside signup queue");
        signUp.handle_userSignUp_request(message, function (err, res) {
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
        console.log("request signin");
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

    cnn.queue('adminSignUp_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            signUp.handle_adminSignUp_request(message, function (err, res) {
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
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


  /*cnn.queue('saveHostDetails_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      signUp.handle_saveHostDetails_request(message, function(err,res){
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });*/

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

    cnn.queue('addCreditCard_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            user.handle_addCreditCard_request(message, function(err,res){
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
            user.handle_getCreditCardDetails_request(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

    cnn.queue('listPropertyRequests_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            admin.handle_listPropertyRequests_request(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

    cnn.queue('approveProperty_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            admin.handle_approveProperty_request(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });

    cnn.queue('rejectProperty_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            admin.handle_rejectProperty_request(message, function(err,res){
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
  
});


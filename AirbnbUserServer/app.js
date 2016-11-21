//super simple rpc server example
var amqp = require('amqp')
    , util = require('util');

var signUp = require('./services/signup');

var cnn = amqp.createConnection({host:'127.0.0.1'});

var userSignUptest = function() {
  const message = {
    user_id: '324-45-6789',
    first_name : 'sid',
    last_name : 'reddy',
    email : 'sidreddy@gmail.com',
    password: 'sidreddy',
    dob: '1994-06-27'
  };
  signUp.userSignUp(message, function(err,res){})
};

userSignUptest();

cnn.on('ready', function(){
  console.log("listening on signUp queue");

  cnn.queue('signUp_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      signUp.userSignUp(message, function(err,res){

        //return index sent
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

});
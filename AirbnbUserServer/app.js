//super simple rpc server example
var amqp = require('amqp')
    , util = require('util');

var signUp = require('./services/signUp');

var cnn = amqp.createConnection({host:'127.0.0.1'});


var userSignUptest = function() {

  function guid()
  {
    function s4()
    {
      var value = Math.floor((Math.random() * 9) + 1);
      return value.toString();
    }
    return s4() + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() + s4() + s4();
  }
  var uuid = guid();

  const message = {
    user_id: uuid,
    first_name : 'ashik',
    last_name : 'panchangam',
    email : 'ashikpanchangam@gmail.com',
    password: 'ashikpanchangam',
    dob: '1994-06-27'
  };
  signUp.userSignUp(message, function(err,res){})
};


var becomeHostTest = function () {
  const msg = {
  };
  signUp.becomeHost(msg, function(err,res){})
};

userSignUptest();
becomeHostTest();

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
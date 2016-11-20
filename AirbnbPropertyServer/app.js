//super simple rpc server example
var amqp = require('amqp')
    , util = require('util');

var property = require('./services/property')

var cnn = amqp.createConnection({host:'127.0.0.1'});

var test = function() {
  // const message = {
  //   category:'Entire Home',
  //   city: 'San Jose',
  //   state: 'CA',
  //   guests: 2,
  //   max_price: 100,
  //   min_price: 10,
  //   checkout: '2016-11-17',
  //   checkin: '2016-11-16'
  // }
  // property.search(message, function(err,res){})

  // const message = {
  //   action: "GET_INFO",
  //   content: {
  //     property_id: '123-45-6789'
  //   }
  // }
  // property.getDetail(message, function(err,res){})

  const message = {
    action: "GET_REVIEW",
    content: {
      property_id: '123-45-6789'
    }
  }
  property.getDetail(message, function(err,res){})
}

test()

cnn.on('ready', function(){
  console.log("listening on property_search_queue");

  cnn.queue('property_search_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      property.search(message, function(err,res){

        //return index sent
        cnn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  console.log("listening on property_detail_queue");

  cnn.queue('property_detail_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      property.getDetail(message, function(err,res){

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
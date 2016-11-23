//super simple rpc server example
var amqp = require('amqp');
var util = require('util');
var mongo = require('./mongo-db');
var bids = require('./services/bids');
var trips = require('./services/trips');
var bills = require('./services/bill');

mongo.connect(function (err) {
  try{
    console.log("Mongod connected");
  }catch (err){
    console.err("Couldn't connect to mongo db");
  }
});

var conn = amqp.createConnection({host:'127.0.0.1'});

conn.on('ready', function(){
  console.log("listening on queues");

  conn.queue('bid_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      bids.handle_bid_queue(message, function(err, res){
        //return index sent
        conn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  conn.queue('trip_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      trips.handle_trip_queue(message, function(err, res){
        //return index sent
        conn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

  conn.queue('bill_queue', function(q){
    q.subscribe(function(message, headers, deliveryInfo, m){
      util.log(util.format( deliveryInfo.routingKey, message));
      util.log("Message: "+JSON.stringify(message));
      util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
      bill.handle_bill_queue(message, function(err, res){
        //return index sent
        conn.publish(m.replyTo, res, {
          contentType:'application/json',
          contentEncoding:'utf-8',
          correlationId:m.correlationId
        });
      });
    });
  });

});
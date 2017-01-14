//super simple rpc server example
var amqp = require('amqp');
var bids = require('./services/bids');
var trips = require('./services/trips');
var bills = require('./services/bill');
var hostAnalytics = require('./services/host_analytics');
var log_data = require('./services/log_data');
var mongo = require('./db/mongo');
var test = require('./test/server_test');
var conn = amqp.createConnection({host: '127.0.0.1'});

mongo.connect(function (err) {
    try{
        console.log("Mongod connected");
        //test.executeGetTests();
        test.executeInsertTests();
    }catch (err){
        console.err("Couldn't connect to mongo db");
    }
});

conn.on('ready', function () {
    console.log("listening on queues");

    conn.queue('bid_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            bids.handle_bid_queue(message, function (err, res) {
                //return index sent
                conn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    conn.queue('trip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            trips.handle_trip_queue(message, function (err, res) {
                //return index sent
                conn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    conn.queue('bill_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            bills.handle_bill_queue(message, function (err, res) {
                //return index sent
                conn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    conn.queue('host_analytics', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            hostAnalytics.handle_bill_queue(message, function (err, res) {
                //return index sent
                conn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    conn.queue('log_data', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            log_data.handle_log_data(message, function (err, res) {
                //return index sent
                conn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
});
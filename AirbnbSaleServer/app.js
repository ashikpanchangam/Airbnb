//super simple rpc server example
var amqp = require('amqp');
var bids = require('./services/bids');
var trips = require('./services/trips');
var bills = require('./services/bill');
var hostAnalytics = require('./services/host_analytics');
var mongo = require('./db/mongo');

mongo.connect(function (err) {
    try{
        console.log("Mongod connected");
        test.executeGetTests();
    }catch (err){
        console.err("Couldn't connect to mongo db");
    }
});

var test = require('./test/server_test');

var conn = amqp.createConnection({host: '127.0.0.1'});

var logger = require('./helpers/logger');

//test.executeGetTests();

// Sample log, writes log to file and MongoDB as well
// For Page clicks data, key is page name
// logger.logToDb({category: 'page_clicks', key: 'PropertyPage', host_id: '345210000', user_id: '345212653'});
// logger.logToDb({category: 'page_clicks', key: 'PropertyPage', host_id: '345210000', user_id: '345212600'});
// logger.logToDb({category: 'page_clicks', key: 'ProfilePage', host_id: '345210000', user_id: '345212653'});
// logger.logToDb({category: 'page_clicks', key: 'HostPage', host_id: '345210000', user_id: '345212600'});
// logger.logToDb({category: 'page_clicks', key: 'PropertyPage', host_id: '345210000', user_id: '345212600'});

// logger.logToFile('Become a host clicked by user: username', false);
// logger.logToDb({category: 'page_clicks', key: 'PropertyPage', msg: 'Become a host clicked by user: username'});
// logger.logToFile('Become a host clicked by user: username', false);
// logger.logToDb({category: 'page_clicks', key: 'ProfilePage', msg: 'Become a host clicked by user: username'});
// logger.logToFile('Become a host clicked by user: username', false);
// logger.logToDb({category: 'page_clicks', key: 'PropertyPage', msg: 'Become a host clicked by user: username'});
// logger.logToFile('Become a host clicked by user: username', false);
// logger.logToDb({category: 'page_clicks', key: 'ProfilePage', msg: 'Become a host clicked by user: username'});

// For property clicks data, key is property ID
// logger.logToFile('Property 32312343 clicked by user: username', false);

// logger.logToDb({category: 'property_clicks', key: '340212050', host_id: '345210000', user_id: '345212653'});
// logger.logToDb({category: 'property_clicks', key: '340212051',  host_id: '345210000', user_id: '345212653'});
// logger.logToDb({category: 'property_clicks', key: '340212050', host_id: '345210000', user_id: '345212600'});
// logger.logToDb({category: 'property_clicks', key: '340212050', host_id: '345210000', user_id: '345212600'});

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
});
/**
 * Created by rishi on 11/21/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');

var INSERT_BID = "INSERT INTO bid (bid_amount, bid_time, bid_property_id, bid_user_id) VALUES (";
var GET_BIDS = "SELECT bid_id, bid_amount, DATE_FORMAT(bid_time,'%Y-%m-%d %h:%i:%s') as bid_time," +
    "bid_property_id as property_id FROM, bid_user_id as user_id bid WHERE ";

function traceBid(msg, callback){
    var selectQuery = GET_BIDS + "bid_user_id = '"  + msg.user_id + "'";
    var result = mysql.performOperation(selectQuery);
    if(result.statusCode == 200){
        var data = [];
        var rows = result.rows;
        for(var i=0; i<rows.length; i++){
            var bid = {bid_id: rows[i].bid_id, property_id: rows[i].property_id,
                user_id: rows[i].user_id, bid_time: rows[i].bid_time, bid_amount: rows[i].bid_amount};
            data.push(bid);
        }
        callback(null, {statusCode: 200, data:data});
    }
    callback(null, {statusCode: result.statusCode});
}

// TODO get bids for the property, not in API may need
function getBidsForProperty(msg, callback){
    var selectQuery = GET_BIDS + "bid_user_id = '" + msg.user_id + "' AND bid_property_id = '" + msg.property_id + "'";
    var result = mysql.performOperation(selectQuery);
    if(result.statusCode == 200){
        var data = [];
        var rows = result.rows;
        for(var i=0; i<rows.length; i++){
            var bid = {bid_id: rows[i].bid_id, property_id: rows[i].property_id,
                user_id: rows[i].user_id, bid_time: rows[i].bid_time, bid_amount: rows[i].bid_amount};
            data.push(bid);
        }
        callback(null, {statusCode: 200, data:data});
    }
    callback(null, {statusCode: result.statusCode});
}

function postBid(msg, callback){
    var user_id = msg.user_id;
    var property_id = msg.property_id;
    var bid_time = getCurrentDateTime();
    var bid_amount = msg.bid_amount;

    var insertQuery = INSERT_BID + bid_amount + ",'" + bid_time + "','" + property_id + "','" + user_id +"')";
    logger.trace("Place bid clicked for property "+ property_id + " by user "+ user_id);
    var result = mysql.performOperation(insertQuery);
    if(result.statusCode == 200){
        callback(null, {statusCode: 200});
    }
    callback(null, {statusCode: result.statusCode});
}

exports.handle_bid_queue = function(msg, callback) {
    switch (msg.action){
        case "TRACE_BID":
            traceBid(msg.content, callback);
            break;
        case 'POST_BID':
            postBid(msg.content, callback);
            break;
        case 'GET_PROPERTY_BID':
            getBidsForProperty(msg.content, callback);
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

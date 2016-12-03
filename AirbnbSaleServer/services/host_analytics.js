/**
 * Created by rishi on 12/2/16.
 */

var mysql = require('../db/mysql');
var mongo = require('../db/mongo');
var timeUtil = require('../helpers/timeutil');
var generateID = require('../helpers/generateID');

function getPropertyClicks(msg, callback){
    var mongoLogs = mongo.collection('airbnb_logs');
    mongoLogs.aggregate([
        {$match: {"data.property_id": {"$exists": true, "$ne": null}, "data.host_id": {"$eq": msg.host_id}}},
        {$group: {_id: "$data.property_id", clicks: {$sum: 1}}}], function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, result});
    });
}

function getAreaClicks(msg, callback){
    var mongoLogs = mongo.collection('airbnb_logs');
    mongoLogs.aggregate([
        {$match: {"data.area": {"$exists": true, "$ne": null}, "data.host_id": {"$eq": msg.host_id}}},
        {$group: {_id: "$data.area", clicks: {$sum: 1}}}], function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, result});
    });
}

function getPageClicks(msg, callback){
    var mongoLogs = mongo.collection('airbnb_logs');
    mongoLogs.aggregate([
        {$match: {"data.page_name": {"$exists": true, "$ne": null}, "data.host_id": {"$eq": msg.host_id}}},
        {$group: {_id: "$data.page_name", clicks: {$sum: 1}}}], function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, result});
    });
}

function getPropertyReviewData(msg, callback){
    var reviewDataQuery = 'SELECT property_id, COUNT(*) AS review_count FROM property INNER JOIN review ON ' +
        'property_id = review_property_id WHERE property_host_id='+ msg.host_id +' GROUP BY property_id';
    mysql.performOperation(reviewDataQuery, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, data: result});
    });
}

function getTraceUser(msg, callback){
    var userTraceQuery = "SELECT user.city AS user_location, property.city AS property_location FROM user, property WHERE property_id IN " +
        "(SELECT trip_property_id from trip where user_id = trip_user_id AND trip_host_id = '"+ msg.host_id +"')";
    mysql.performOperation(userTraceQuery, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, data: result});
    });
}

exports.handle_host_analytics = function(msg, callback) {
    switch (msg.action){
        case 'PAGE_CLICKS':
            getPageClicks(msg.content, callback);
            break;
        case 'PROPERTY_CLICKS':
            getPropertyClicks(msg.content, callback);
            break;
        case 'AREA_CLICKS':
            getAreaClicks(msg.content, callback);
            break;
        case 'REVIEW_DATA':
            getPropertyReviewData(msg.content, callback);
            break;
        case 'TRACE_USER':
            getTraceUser(msg.content, callback);
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

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
        {$match: {"data.property_id": {"$exists": true, "$ne": null}}},
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
        {$match: {"data.area": {"$exists": true, "$ne": null}}},
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
        {$match: {"data.page_name": {"$exists": true, "$ne": null}}},
        {$group: {_id: "$data.page_name", clicks: {$sum: 1}}}], function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, result});
    });
}

function getPropertyReviewData(msg, callback){

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

function getTripsForHost(msg, callback){
    mysql.performOperation(GET_TRIPS_HOST + msg.host_id + "'", function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        var trips = [];
        var rows = result.rows;
        for(var i=0; i<rows.length; i++){
            var trip = {trip_id: rows[i].trip_id, check_in: rows[i].check_in, check_out: rows[i].check_out,
                guests: rows[i].guests, trip_property_id: rows[i].trip_property_id, trip_user_id: rows[i].trip_user_id,
                first_name: rows[i].first_name, last_name: rows[i].last_name};
            trips.push(trip);
        }
        callback(null, {statusCode: 200, data: trips});
    });
}

function getTripsForUser(msg, callback){
    mysql.performOperation(GET_TRIPS_USER + msg.user_id + "'", function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        var trips = [];
        var rows = result.rows;
        for(var i=0; i<rows.length; i++){
            var trip = {trip_id: rows[i].trip_id, check_in: rows[i].check_in, check_out: rows[i].check_out,
                guests: rows[i].guests, trip_property_id: rows[i].trip_property_id, trip_host_id: rows[i].trip_user_id,
                first_name: rows[i].first_name, last_name: rows[i].last_name};
            trips.push(trip);
        }
        callback(null, {statusCode: 200, data: trips});
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
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

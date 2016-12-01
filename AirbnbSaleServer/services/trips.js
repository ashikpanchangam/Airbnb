/**
 * Created by rishi on 11/21/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');
var generateID = require('../helpers/generateID');

var CREATE_TRIP = "INSERT INTO trip (trip_id, guests, total, check_in, check_out, trip_user_id, trip_host_id, trip_property_id) VALUES ('";

var GET_BILL_ID = "SELECT trip_bill_id as bill_id FROM trip WHERE trip_id = '";
var EDIT_BILL = "UPDATE bill SET ";

var DELETE_TRIP = "DELETE FROM trip WHERE trip_id = ";

var GET_TRIPS_HOST = "SELECT trip_id, DATE_FORMAT(check_in,'%Y-%m-%d %h:%i:%s') as check_in, " +
    "DATE_FORMAT(check_out,'%Y-%m-%d %h:%i:%s') as check_out, guests, trip_property_id, trip_user_id, first_name, last_name " +
    "FROM trip INNER JOIN bill INNER JOIN user ON trip_id = bill_trip_id AND trip_user_id = user_id WHERE trip_host_id = '";

var GET_TRIPS_USER = "SELECT trip_id, DATE_FORMAT(check_in,'%Y-%m-%d %h:%i:%s') as check_in, " +
    "DATE_FORMAT(check_out,'%Y-%m-%d %h:%i:%s') as check_out, guests, trip_property_id, trip_user_id FROM trip INNER JOIN bill " +
    "ON trip_id = bill_trip_id WHERE trip_user_id = '";

function createTrip(msg, callback){
    var trip_id = generateID.getId();
    var insertTrip = CREATE_TRIP + trip_id + "', " + msg.guests + ", " + msg.total + ", '"+  timeUtil.formatDate(msg.check_in) + "', '" +
        timeUtil.formatDate(msg.check_out) + "', '" + msg.user_id + "', '" + msg.host_id + "', '" + msg.property_id + "')";
    mysql.performOperation(insertTrip, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, data: {trip_id: trip_id}});
    });
}


function editTrip(msg, callback){
    var updateBill = EDIT_BILL + "bill_total = " + msg.bill_total + ", bill_date = '" + timeUtil.getCurrentDateTime() + "', " +
        "' from_date = '" + timeUtil.formatDate(msg.check_in) + "', to_date = '" + timeUtil.formatDate(msg.check_out) + "' WHERE " +
        "bill_trip_id = "+ msg.trip_id;
    mysql.performOperation(updateBill, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200, data: {trip_id: msg.trip_id}});
    });
}

function deleteTrip(msg, callback){
    mysql.performOperation(DELETE_TRIP + msg.trip_id, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200});
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

exports.handle_trip_queue = function(msg, callback) {
    switch (msg.action){
        case "CREATE_TRIP":
            createTrip(msg.content, callback);
            break;
        case 'EDIT_TRIP':
            editTrip(msg.content, callback);
            break;
        case 'DELETE_TRIP':
            deleteTrip(msg.content, callback);
            break;
        case 'GET_TRIPS_HOST':
            getTripsForHost(msg.content, callback);
            break;
        case 'GET_TRIPS_USER':
            getTripsForUser(msg.content, callback);
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

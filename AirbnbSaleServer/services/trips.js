/**
 * Created by rishi on 11/21/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');
var generateID = require('../helpers/generateID');

var CREATE_BILL = "INSERT INTO bill (bill_id, bill_total, guests, bill_date, check_in, check_out, bill_property_id, bill_trip_id, " +
    "bill_host_id, bill_user_id) VALUES ('";
var CREATE_TRIP = "INSERT INTO trip (trip_id, trip_user_id, trip_host_id, trip_property_id) VALUES ('";

var GET_BILL_ID = "SELECT trip_bill_id as bill_id FROM trip WHERE trip_id = '";
var EDIT_BILL = "UPDATE bill SET ";

var DELETE_TRIP = "DELETE FROM trip WHERE trip_id = ";

var GET_TRIPS_HOST = "SELECT trip_id, check_in, check_out, guests, trip_property_id, trip_user_id FROM trip INNER JOIN bill " +
    "user ON trip_id = bill_trip_id AND trip_user_id = user_id WHERE trip_host_id = '";
var GET_TRIPS_USER = "SELECT trip_id, check_in, check_out, guests, trip_property_id, trip_user_id FROM trip INNER JOIN bill " +
    "user ON trip_id = bill_trip_id AND trip_user_id = user_id WHERE trip_user_id = '";

function createTrip(msg, callback){
    var trip_id = generateID.getId();
    var insertTrip = CREATE_TRIP + trip_id + "', '" + msg.user_id + "', '" + msg.host_id + "', '" + msg.property_id + "'";
    var result = mysql.performOperation(insertTrip);

    if(result.statusCode == 200){
        var bill_id = generateID.getId();
        var bill_date = timeUtil.getCurrentDateTime();
        var insertBill = CREATE_BILL + bill_id + "', " + msg.guests + ", " + msg.total + ", '" + bill_date + "', '" +
            timeUtil.formatDate(msg.check_in) + "', '" + timeUtil.formatDate(msg.check_out) + "', '" + msg.property_id + "', '" +
            msg.host_id + "', '" + msg.user_id + "', '" + trip_id + "'";
        result = mysql.performOperation(insertBill);
        if(result.statusCode == 200){
            callback(null, {statusCode: 200, data: {trip_id: trip_id}});
        }
    }
    callback(null, {statusCode: 400});
}


function editTrip(msg, callback){
    var updateBill = EDIT_BILL + "bill_total = " + msg.bill_total + ", bill_date = '" + timeUtil.getCurrentDateTime() + "', " +
        "' from_date = '" + timeUtil.formatDate(msg.check_in) + "', to_date = '" + timeUtil.formatDate(msg.check_out) + "' WHERE " +
        "bill_trip_id = "+ msg.trip_id;
    if(updateBill.statusCode == 200){
        callback(null, {statusCode: 200, data: {trip_id: msg.trip_id}});
    }
    callback(null, {statusCode: 400});
}

function deleteTrip(msg, callback){
    var deleteTrip = mysql.performOperation(DELETE_TRIP + msg.trip_id);
    callback(null, {statusCode: deleteTrip.statusCode});
}

function getTripsForHost(msg, callback){
    var result = mysql.performOperation(GET_TRIPS_HOST + msg.host_id + "'");
    var trips = [];
    if(result.statusCode == 200){
        for(var i=0; i<result.rows.length; i++){
            var trip = {trip_id: result.rows.trip_id, check_in: result.rows.check_in, check_out: result.rows.check_out,
                guests: result.rows.guests, trip_property_id: result.rows.trip_property_id, trip_user_id: result.rows.trip_user_id,
                first_name: result.rows.first_name, last_name: result.rows.last_name};
            trips.push(trip);
        }
        callback(null, {statusCode: 200, data: trips});
    }
    callback(null, {statusCode: 400});
}

function getTripsForUser(msg, callback){
    var result = mysql.performOperation(GET_TRIPS_USER + msg.user_id + "'");
    var trips = [];
    if(result.statusCode == 200){
        for(var i=0; i<result.rows.length; i++){
            var trip = {trip_id: result.rows.trip_id, check_in: result.rows.check_in, check_out: result.rows.check_out,
                guests: result.rows.guests, trip_property_id: result.rows.trip_property_id, trip_host_id: result.rows.trip_user_id,
                first_name: result.rows.first_name, last_name: result.rows.last_name};
            trips.push(trip);
        }
        callback(null, {statusCode: 200, data: trips});
    }
    callback(null, {statusCode: 400});
}

exports.handle_trip_queue = function(msg, callback) {
    switch (msg.action){
        case "CREATE_TRIP":

            break;
        case 'EDIT_TRIP':

            break;
        case 'DELETE_TRIP':

            break;
        case 'GET_TRIPS_HOST':
            break;
        case 'GET_TRIPS_USER':
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

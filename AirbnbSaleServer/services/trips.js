/**
 * Created by rishi on 11/21/16.
 */

var mongo = require('../db/mongo');
var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');

var CREATE_BILL = "INSERT INTO bill (bill_id, bill_total, guests, bill_date, from_date, to_date, bill_property_id, " +
    "bill_host_id, bill_user_id) VALUES ('";
var CREATE_TRIP = "INSERT INTO trip (trip_id, trip_user_id, trip_host_id, trip_property_id, trip_bill_id) VALUES ('";

function createTrip(msg, callback){
    // TODO generate this ID
    var bill_id = "";
    var bill_date = timeUtil.getCurrentDateTime();
    var insertBill = CREATE_BILL + bill_id + "', " + msg.guests + ", " + msg.total + ", '" + bill_date + "', '" +
        timeUtil.formatDate(msg.check_in) + "', '" + timeUtil.formatDate(msg.check_out) + "', '" + msg.property_id + "', '" +
        msg.host_id + "', '" + msg.user_id + "'";

    var resultForBill = mysql.performOperation(insertBill);
    if(resultForBill == 200){
        var trip_id = ""; //TODO generate it
        var insertTrip = CREATE_TRIP + trip_id + "', '" + msg.user_id + "', '" + msg.host_id + "', '" + msg.property_id +
            "', '" + bill_id + "'";
        var result = mysql.performOperation(insertTrip);
        if(result.statusCode == 200){
            callback(null, {statusCode: 200, data: {trip_id: trip_id}});
        }
    }
    callback(null, {statusCode: 400});
}


function editTrip(msg, callback){
    //TODO
}

function deleteTrip(msg, callback){
    //TODO
}

function getTripsForHost(msg, callback){
    //TODO
}

function getTripsForUser(msg, callback){
    //TODO
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

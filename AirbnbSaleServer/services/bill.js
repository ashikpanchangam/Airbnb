/**
 * Created by rishi on 11/22/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');
var generateID = require('../helpers/generateID');

var CREATE_BILL = "INSERT INTO bill (bill_id, bill_date, bill_property_id, bill_host_id, bill_user_id, bill_trip_id) VALUES ('";

var GENERATE_BILL = "SELECT * FROM trip INNER JOIN user INNER JOIN property INNER JOIN bill " +
    "ON trip_user_id = user_id AND trip_property_id = property_id AND trip_id = bill_trip_id " +
    "WHERE trip_id = '";

var DELETE_BILL = "DELETE FROM bill WHERE bill_id = '";

var SEARCH_BILL = "";

function generateBill(msg, callback){
    var insertBillQuery = CREATE_BILL + generateID.getId() + "', " + timeUtil.getCurrentDateTime() + ", '" + msg.property_id + "', '" +
            msg.host_id + "', '" + msg.user_id + "', '" + msg.trip_id + "')";
    mysql.performOperation(insertBillQuery, function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        mysql.performOperation(GENERATE_BILL + msg.trip_id + "'", function (err, result) {
            if(err){
                callback(null, {statusCode: 400});
            }
            var row = result.rows[0];
            var bill = {bill_id: row.bill_id, check_in: timeUtil.formatDate(row.check_in), check_out: timeUtil.formatDate(row.check_out),
                bill_date: row.bill_date, bill_total: row.bill_total};

            var property = {property_id: row.property_id, address: row.address, category: row.category,
                city: row.city, state: row.state, zip_code: row.zip_code, guests: row.accomodates,
                desc: row.description, price: row.price};

            var user = {first_name: row.first_name, last_name: row.last_name, phone_number: row.phone_number, email: row.email};

            callback(null, {statusCode: 200, data:{bill:bill, property: property, user: user}});
        });
    });
}

function deleteBill(msg, callback){
    mysql.performOperation(DELETE_BILL + msg.bill_id +"'", function (err, result) {
        if(err){
            callback(null, {statusCode: 400});
        }
        callback(null, {statusCode: 200});
    });
}

function searchBill(msg, callback){
    //TODO
}

exports.handle_bill_queue = function(msg, callback) {
    switch (msg.action){
        case "GENERATE_BILL":
            generateBill(msg.content, callback);
            break;
        case 'DELETE_BILL':
            deleteBill(msg.content, callback);
            break;
        case 'SEARCH_BILL':
            // TODO Need to understand the requirement
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};
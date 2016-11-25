/**
 * Created by rishi on 11/22/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');

var GENERATE_BILL = "SELECT * FROM trip INNER JOIN user INNER JOIN property INNER JOIN bill " +
    "ON trip_user_id = user_id AND trip_property_id = property_id AND trip_id = bill_trip_id " +
    "WHERE trip_id = '";
function generateBill(msg, callback){
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
}


exports.handle_bill_queue = function(msg, callback) {
    switch (msg.action){
        case "GENERATE_BILL":
            generateBill(msg.content, callback);
            break;
        case 'DELETE_BILL':
            // TODO Need to understand the requirement
            break;
        case 'SEARCH_BILL':
            // TODO Need to understand the requirement
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};
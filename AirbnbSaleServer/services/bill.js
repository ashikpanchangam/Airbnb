/**
 * Created by rishi on 11/22/16.
 */

var mysql = require('../db/mysql');
var timeUtil = require('../helpers/timeutil');

var GENERATE_BILL = "SELECT * FROM trip INNER JOIN user INNER JOIN property INNER JOIN bill " +
    "ON trip_user_id = user_id AND trip_property_id = property_id AND trip_id = bill_trip_id " +
    "WHERE trip_id = '";
function generateBill(msg, callback){
    var result = mysql.performOperation(GENERATE_BILL + msg.trip_id + "'");
    if(result.statusCode == 200){
        var rows = result.rows;
        var bill = {bill_id: rows.bill_id, check_in: rows.check_in, check_out: rows.check_out,
                    bill_date: rows.bill_date, bill_total: rows.bill_total};

        var property = {property_id: rows.property_id, address: rows.address, category: rows.category,
                        city: rows.city, state: rows.state, zip_code: rows.zip_code, guests: rows.accomodates,
                        desc: rows.description, price: rows.price};

        var user = {first_name: rows.first_name, last_name: rows.last_name, phone_number: rows.phone_number, email: rows.email};

        callback(null, {statusCode: 200, data:{bill:bill, property: property, user: user}});
    }
    callback(null, {statusCode: 400});
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
/**
 * Created by ASHIK'S PC on 11/26/2016.
 */

var mongo = require('../db/mongo');
var mysql = require('../db/mysql');
var bcrypt = require('bcrypt-nodejs');
var mysqlModule = require('mysql');
var mongoURL = "mongodb://54.70.90.14:27017/test";

exports.handle_editUserProfile_request = function (msg, callback) {
    
    console.log('Using the editUserProfile_queue');

    var user_id = msg.user_id;
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var dob = msg.dob;
    var email = msg.email;
    var phone_number = msg.phone_number;
    var address = msg.address;

    var json_response = {};

    var query = "Update airbnb_mysql.user set first_name ='" + first_name
        + "',last_name = '" + last_name + "',address = '" + address
        + "',dob = '" + dob + "',email = '" + email + "',phone_number = '" + phone_number
        + "' where user_id ='" + user_id + "'";

    mysql.fetchData(function(error, results) {

        if (error)
        {
            json_response = {
                "statusCode" : 401,
                "statusMessage" : "Error occurred while editing user details"
            };
            callback(null, json_response);
        } 
        else if (results)
        {
            json_response = {
                "statusCode" : 200,
                "statusMessage" : "Successfully saved the changes"
            };
        }
        else
        {
            json_response = {
                "statusCode" : 403,
                "statusMessage" : "Could not update the details"
            };
        }
    }, query);

};
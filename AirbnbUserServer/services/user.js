/**
 * Created by ASHIK'S PC on 11/26/2016.
 */

var mysql = require('../db/mysql');
var bcrypt = require('bcrypt-nodejs');

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

    var updateQuery = "Update airbnb_mysql.user set first_name ='" + first_name
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
    }, updateQuery);

};

exports.handle_addCreditCard_request = function(msg, callback){
    console.log("....Using the saveCardDetails_queue....");
    var json_response = {};

    var user_id = msg.user_id;

    var credit_card_number = msg.credit_card_number;
    var credit_card_holder = msg.credit_card_holder;
    var credit_card_expiry = msg.credit_card_expiry;
    var security_code = msg.security_code;

    var selectQuery;
    var updateQuery;

    console.log(msg);                                       //print the message

    selectQuery = "select count(*) as resultCount from airbnb_mysql.user where credit_card_number='"+credit_card_number+"'";

    updateQuery = "UPDATE airbnb_mysql.user SET credit_card_number='"+credit_card_number+"'," +
        " credit_card_holder='"+credit_card_holder+"', credit_card_expiry='"+credit_card_expiry+"'," +
        " security_code='"+security_code+"' WHERE user_id ='"+user_id+"'";

    mysql.fetchData(function (error, results) {
        if(results[0].resultCount == 0)
        {
            mysql.fetchData(function (error, results) {
                if(error)
                {
                    json_response ={
                        "statusCode" : 401,
                        "results" : error.code
                    };
                    callback(null, json_response);
                }
                else
                {
                    json_response ={
                        "statusCode" : 200,
                        "results" : results,
                        "statusMessage": "Successfully added the credit card"
                    };
                    callback(null, json_response);
                }
            }, updateQuery)
        }
        else
        {
            json_response ={
                "statusCode" : 403,
                "results" : results,
                "statusMessage": "Credit card is already in use"
            };
            callback(null, json_response);
        }
    }, selectQuery)
};

exports.handle_getCreditCardDetails_request = function (msg, callback) {

    var credit_card_number = msg.credit_card_number;
    var credit_card_holder = msg.credit_card_holder;
    var credit_card_expiry = msg.credit_card_expiry;
    var security_code = msg.security_code;

    var user_id = msg.user_id;

    var json_response = {};

    var selectQuery = "SELECT credit_card_number, credit_card_holder, credit_card_expiry, security_code " +
        "FROM airbnb_mysql.user WHERE user_id='"+user_id+"'";

    mysql.fetchData(function (error,results) {
        if(error)
        {
            json_response ={
                "statusCode" : 401,
                "results" : error.code
            };
            callback(null, json_response);
        }
        else
        {
            if(results.length <= 0)
            {
                json_response ={
                    "statusCode" : 403,
                    "statusMessage" : "Credit Card has not been added. Please add credit card"
                };
                callback(null, json_response);
            }
            else
            {
                json_response ={
                    "statusCode" : 200,
                    "statusMessage" : "Fetched Credit Card details successfully",
                    "results" : results
                };
                callback(null, json_response);
            }
        }
    }, selectQuery);

};

exports.handle_updateCreditCardDetails_request = function (msg, callback) {

    var credit_card_number = msg.credit_card_number;
    var credit_card_holder = msg.credit_card_holder;
    var credit_card_expiry = msg.credit_card_expiry;
    var security_code = msg.security_code;

    var json_response = {};

    var updateQuery = "UPDATE airbnb_mysql.user set credit_card_holder= '" + credit_card_holder + "'" +
        ", credit_card_expiry = '" + credit_card_expiry + "'" +
        ",security_code = '" + security_code + "' where credit_card_number ='" + credit_card_number + "'";

    mysql.fetchData(function(error, results) {

        if (error)
        {
            json_response = {
                "statusCode" : 401,
                "statusMessage" : "Error occurred"
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
    }, updateQuery);

};
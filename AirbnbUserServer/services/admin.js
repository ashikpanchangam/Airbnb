/**
 * Created by ASHIK'S PC on 11/30/2016.
 */

var mysql = require('../db/mysql');

function listPropertyRequests(msg, callback) {

    console.log("Using the 'admin_queue'");
    var json_response = {};
    var property_approved = 0;
    
    var selectQuery = "select * from airbnb_mysql.property where property_approved="+ property_approved +"";

    mysql.fetchData(function(error, results) {
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
                    "statusMessage" : "No pending requests"
                };
                callback(null, json_response);
            }
            else
            {
                json_response ={
                    "statusCode" : 200,
                    "statusMessage" : "Successfully listed all the property requests",
                    "results" : results
                };
                callback(null, json_response);
            }
        }
    }, selectQuery);
}

function approveProperty(msg, callback) {

    console.log("Using the 'admin_queue'");
    var json_response = {};
    var property_id = msg.property_id;
    var property_approved = 1;

    var updateQuery = "UPDATE airbnb_mysql.property SET property_approved="+property_approved+" WHERE property_id ='"+property_id+"'";

    mysql.fetchData(function(error, results) {
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
                "statusMessage" : "Property approved"
            };
            callback(null, json_response);
        }
    }, updateQuery);
}

function rejectProperty(msg, callback) {

    console.log("Using the 'admin_queue'");
    var json_response = {};
    var property_id = msg.property_id;
    var property_approved = 2;

    var updateQuery = "UPDATE airbnb_mysql.property SET property_approved="+property_approved+" WHERE property_id='"+property_id+"'";

    mysql.fetchData(function(error, results) {
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
                "statusMessage" : "Property rejected"
            };
            callback(null, json_response);
        }
    }, updateQuery);
}

exports.handle_admin_queue = function(msg, callback) {
    switch (msg.action){
        case 'LIST_PROPERTY_REQUESTS':
            listPropertyRequests(msg.content, callback);
            break;
        case 'APPROVE_PROPERTY':
            approveProperty(msg.content, callback);
            break;
        case 'REJECT_PROPERTY':
            rejectProperty(msg.content, callback);
            break;
        default:
            callback(null, {statusCode: 400});
            break;
    }
};
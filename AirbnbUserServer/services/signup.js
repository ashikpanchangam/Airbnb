/**
 * Created by ASHIK'S PC on 11/20/2016.
 */

var mongo = require('../db/mongo');
var mysql = require('../db/mysql');
var bcrypt = require('bcrypt-nodejs');
var mysqlModule = require('mysql');

exports.handle_signUp_request = function (msg,callback) {
    console.log("Using the 'signUp_queue'");                //subscribing to the signUp_queue
    var json_response = {};
    var email = msg.email;
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var password = msg.password;
    var dob = msg.dob;
    var query;

    console.log(msg);                                       //print the message
        
    query = "INSERT into user (user_id, first_name, last_name, email, password) values(?,?,?,?,?)";
    var inputParameters = [email,first_name,last_name,password,dob];
    
    var signUpQuery = mysqlModule.format(query, inputParameters);
    mysql.fetchData(function (error,results) {
        
        if(error)
        {
            console.log(error);
            json_response = {
                "statusCode" : 401,
                "statusMessage" : "Unauthorized. Access is denied",
                "results" : error.code
            };
            callback(null, json_response);
        }
        else
        {
            console.log(results);
            console.log(results.length);
            if(results.length <= 0)
            {
                json_response = {
                    "statusCode" : 200,
                    "statusMessage" : "Successfully created an account",
                    "results" : results
                };
                callback(null, json_response);
            }
            else    
            {
                json_response = {
                    "statusCode" : 403,
                    "statusMessage" : "Email already exists",
                    "results" : results
                };
                callback(null, json_response);
            }
        }

    }, signUpQuery)
};

exports.handle_userLogin_request = function () {
    console.log("Using the 'userLogin_queue'");                //subscribing to the userLogin_queue
    var json_response = {};
    var email = msg.email;
    var password = msg.password;
    var query;
    
    console.log(msg);
    
    query = "SELECT * from airbnb_mysql.user where email='"+ email +"'";
    mysql.fetchData(function(error, results) {
        console.log(error);
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
            console.log(results);
            console.log(results.length);
            if(results.length > 0)
            {
                    bcrypt.compare(password, results[0].password, function(err,correctPassword) {

                        if(correctPassword)
                        {
                            json_response ={
                                "statusCode" : 200,
                                "statusMessage" : "Success",
                                "results" : results
                            };
                            callback(null, json_response);
                        }
                        else
                        {
                            json_response ={
                                "statusCode" : 403,
                                "statusMessage" : "Invalid login credentials"
                            };
                            callback(null, json_response);
                        }
                    });
            }
            else
            {
                json_response ={
                    "statusCode" : 403,
                    "statusMessage" : "No Details Found"
                };
                callback(null, json_response);
            }
        }
    }, query);
};
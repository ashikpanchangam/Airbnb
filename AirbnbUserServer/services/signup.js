nc/**
 * Created by ASHIK'S PC on 11/20/2016.
 */

var mongo = require('./db/mongo');
var mysql = require('./db/mysql');
var bcrypt = require('bcrypt-nodejs');
var mysqlModule = require('mysql');
var mongoURL = "mongodb://54.70.90.14:27017/test";

exports.handle_signUp_request = function (msg, callback) {
    console.log("Using the 'signUp_queue'");                //subscribing to the signUp_queue
    var json_response = {};
    var email = msg.email;
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var password = msg.password;
    var dob = msg.dob;
    var is_host = false;
    var query;

    function guid()
    {
        function s4()
        {
            var value = Math.floor((Math.random() * 9) + 1);
            return value.toString();
        }

        function s3()
        {
            var value = Math.floor((Math.random() * 9) + 0);
            return value.toString();
        }
        return s4() + s3() + s3() + '-' + s3() + s3() + '-' + s3() + s3() + s3() + s3();
    }

    var user_id = guid();

    console.log(msg);                                       //print the message
        
    query = "INSERT into airbnb_mysql.user (user_id, email, first_name, last_name, password, dob, is_host) values(?,?,?,?,?,?,?)";
    var inputParameters = [user_id,email,first_name,last_name,password,dob,is_host];
    
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

exports.handle_userLogin_request = function (msg, callback) {
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

exports.handle_becomeHost_request = function (msg, callback) {
    var json_response = {};
    var query;
    var user_id = msg.user_id;
    console.log("Using the 'becomeHost_queue'");

    query = "UPDATE airbnb_mysql.user SET is_host='"+true+"' WHERE user_id='"+user_id+"'";

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
                "results" : results,
                "statusMessage" : "Success"
            };
            callback(null, json_response);
        }
    }, query)
};

exports.handle_adminLogin_request = function(msg, callback)
{
    console.log("Using the adminLogin_request");
    var json_response = {};
    var email = msg.email;
    var password = msg.password;

    var query = "select * from airbnb_mysql.user where email='"+ email +"'";

    mysql.fetchData(function(error, results) {
        if(error)
        {
            console.log(error);                                 //Print the error

            json_response ={
                "statusCode" : 401,
                "results" : error.code
            };
            callback(null, json_response);
        }
        else
        {
            console.log(results);                               //Print the results
            if(results.length <= 0)
            {
                json_response ={
                    "statusCode" : 403,
                    "statusMessage" : "Invalid email id"
                };
                callback(null, json_response);
            }
            else
            {
                bcrypt.compare(password, results[0].password, function(err,correctPassword) {

                    console.log ("The correct password is" + correctPassword);
                    console.log ("The entered password" + password);
                    console.log ("password " + results[0].password);

                    if(correctPassword)
                    {
                        json_response ={
                            "statusCode" : 200,
                            "statusMessage" : "Successful login",
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
        }
    }, query);
};

exports.handle_saveHostDetails_request = function (msg, callback) {
    var json_response = {};
    var user_id = msg.user_id;
    var video = msg.video;
    
    var address = msg.address;
    var city= msg.city;
    var state= msg.state;
    var zip_code= msg.zip_code;
    var phone_number= msg.phone_number;

    var location = msg.location;
    var location_lat = msg.location_lat;
    var location_long = msg.location_lng;

    var query = "UPDATE airbnb_mysql.user set address = '" + address
        + "',city = '" + city + "',state = '" + state + "',zip_code = '" + zip_code
        + "',phone_number = '" + phone_number + "',location = '" + location
        + "',location_lat = '" + location_lat + "',location_long = '" + location_long + "' where user_id ='" + user_id + "'";

    mysql.fetchData(function(error,results){

        if(error)
        {
            console.log(error.code);
            json_response ={
                "statusCode" : 401,
                "statusMessage" : error.code
            };
            callback(null, json_response);
        }
        else
        {
            mongo.connect(mongoURL, function(){
                var coll = mongo.collection('host_details');
                coll.insertOne({user_id: parseInt(user_id),video:video}, function(error, results){

                    if (error)
                    {
                        json_response ={
                            "statusCode" : 401,
                            "statusMessage" : "Unexpected error occurred"
                        };
                        callback(null, json_response);
                    }
                    else
                    {
                        json_response ={
                            "statusCode" : 200,
                            "statusMessage" : "Success"
                        };
                        callback(null, json_response);
                    }
                });
            });
        }
    }, query);
};

exports.handle_saveCardDetails_request = function(msg, callback){
  console.log("....Using the saveCardDetails_queue....");

};

exports.handle_deleteUserAccount_request = function (msg, callback) {
    console.log("Using the 'deleteUserAccount_queue'");
    var json_response = {};
    var query;
    var user_id = msg.user_id;

    query = "DELETE from airbnb_mysql.user WHERE user_id='"+user_id+"'";

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
                "results" : results,
                "statusMessage" : "Successfully deleted the account"
            };
            callback(null, json_response);
        }
    }, query)
};

exports.handle_deleteHostAccount_request = function (msg, callback) {
    console.log("Using the 'deleteHostAccount_queue'");
    var json_response = {};
    var user_id = msg.user_id;

    var query = "UPDATE airbnb_mysql.user set is_host = '" + false + "', address = '" +null+ "'," +
        " video = '"+ null +"', city = '" +null+ "', state = '" + null + "'," +
        " zip_code = '" + null + "', phone_number = '" + null + "'," +
        " location = '" + null + "', location_lat = '" + null + "'," +
        " location_lng = '" + null + "' where user_id ='" + user_id + "'";

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
                "results" : results,
                "statusMessage" : "Successfully deleted the account"
            };
            callback(null, json_response);
        }
    }, query)
};
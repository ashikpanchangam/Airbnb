/**
 * Created by ASHIK'S PC on 11/19/2016.
 */

var mysql = require("mysql");
var async = require("async");

var pool    =   mysql.createPool({
    connectionLimit : 20,
    host     : 'ec2-54-212-241-30.us-west-2.compute.amazonaws.com',
    user     : 'cmpe273',
    password : 'cmpe273',
    database : 'airbnb_mysql',
    debug    :  false
});

function userSignUp(msg,type,callback) {
    async.waterfall([
            function(callback) {
                pool.getConnection(function(err,connection){

                    if(err) {
                        callback(err, true);
                    } else {
                        callback(null,connection);
                    }
                });
            },
            function(connection,callback) {

                var query;
                switch(type) {
                    case "signUp":
                        query = 'INSERT into user (user_id, first_name, last_name, email, password,' +
                                ' dob) ' +
                                'VALUES ('+connection.escape(msg.user_id)+','+connection.escape(msg.first_name)+',' +
                            ''+connection.escape(msg.last_name)+','+connection.escape(msg.email)+',' +
                            ''+connection.escape(msg.password)+','+connection.escape(msg.dob)+')';
                        break;
                    default :
                        break;
                }
                callback(null,connection,query);
            },
            function(connection,query,callback)
            {
                connection.query(query,function(err,rows){
                    console.log('Mysql operator: conn_id= ' + connection.threadId + ' query= ' + query);
                    connection.release();
                    if(!err)
                    {

                        if(type === "login" || type === "profile")
                        {
                            callback(null, rows.length === 0 ? false : rows[0]);
                        }
                        else if(type === "authenticate")
                        {
                            callback(null, rows.length === 0 ? false : true);
                        }
                        else if(type === "signUp")
                        {
                            callback(null, rows.length === 0 ? false : rows);
                        }
                        else {
                            console.log('Query type: ' + type);
                            callback(null, true);
                        }
                    }
                    else
                    {
                        callback(err, true);
                    }
                });
            }],
        function(err, result)
        {
            console.log('Query err: ',  err);
            console.log('Query result: ', result);
            if(err)
            {
                callback(null);
            }
            else
            {
                callback(result);
            }
        });
}

exports.userSignUp = userSignUp;
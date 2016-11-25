/**
 * Created by rishi on 11/5/16.
 */

var mysql = require("mysql");
var logger = require('../helpers/logger').getLogger();

var pool    =   mysql.createPool({
    connectionLimit : 20,
    host     : 'ec2-54-212-241-30.us-west-2.compute.amazonaws.com',
    user     : 'cmpe273',
    password : 'cmpe273',
    database : 'airbnb_mysql',
    debug    :  false
});

function handleError(err) {
    logger.error("Error getting connection: '"+ err);
}

function queryExecutionError(err, query){
    logger.error("Query: '"+ query + "' execution failed. Error " + err);
}

function performOperation(query, callback){
    pool.getConnection(function (err, connection) {
        if(err){
            handleError(err);
            callback(true, err);
        }
        console.log("Making query :"+ query);
        connection.query(query, function (err, rows, fields) {
            if(err){
                queryExecutionError(err, query);
                callback(true, err);
            }
            connection.release();
            callback(false, {rows: rows, fields: fields});
        });
    });
}

exports.performOperation = performOperation;
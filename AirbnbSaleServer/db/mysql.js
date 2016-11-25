/**
 * Created by rishi on 11/5/16.
 */

var mysql = require("mysql");

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
    return {statusCode : 503};
}

function queryExecutionError(err, query){
    logger.error("Query: '"+ query + "' execution failed. Error " + err);
    return {statusCode: 503};
}

function performOperation(query){
    pool.getConnection(function (err, connection) {
        if(err){
            handleError(err);
            return;
        }
        connection.query(query, function (err, rows, fields) {
            if(err){
                queryExecutionError(err, query);
                return;
            }
            connection.release();
            return {statusCode: 200, rows: rows, fields: fields};
        });
    });
}

exports.performOperation = performOperation;
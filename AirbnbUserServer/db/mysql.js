/**
 * Created by ASHIK'S PC on 11/19/2016.
 */

var mysql = require("mysql");
var async = require("async");
var listOfConnections = require("collections/list");
var connectionPool;

function getConnection()
{
    var connection    =   mysql.createConnection({
        connectionLimit : 20,
        host     : 'ec2-54-212-241-30.us-west-2.compute.amazonaws.com',
        user     : 'cmpe273',
        password : 'cmpe273',
        database : 'airbnb_mysql',
        debug    :  false
    });   
    return connection;
}


exports.createConnectionPool = function(noOfConnections){
    connectionPool = new listOfConnections();
    for(var i=0;i<noOfConnections;i++)
    {
        connectionPool.push(getConnection());
    }
};

var getConnectionFromConnectionPool = function (){
    if(connectionPool.length == 0)
    {
        return getConnection();
    }
    else
    {
        return connectionPool.pop();
    }
};

var releaseConnection = function(connection){
    connectionPool.push(connection);
};

exports.fetchData = function(callback,sqlQuery){
    var connection=getConnectionFromConnectionPool();
    connection.query(sqlQuery, function(err, rows, fields) {
        if(err)
        {
            console.log("ERROR: " + err.message);
        }
        callback(err, rows);
    });
    releaseConnection(connection);
};	

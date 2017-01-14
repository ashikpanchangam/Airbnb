/**
 * Created by rishi on 11/23/16.
 */

var log4js = require('log4js');
var mongoAppender = require('log4js-node-mongodb');
var mysql = require('../db/mysql');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('airbnb_server.log'), 'airbnb_user');

log4js.addAppender(
    mongoAppender.appender(
        {connectionString: 'localhost:27017/AirbnbMongo',
            collectionName: 'airbnb_logs'}),
    'page_clicks'
);

log4js.addAppender(
    mongoAppender.appender(
        {connectionString: 'localhost:27017/AirbnbMongo',
            collectionName: 'airbnb_logs'}),
    'property_clicks'
);


var fileLogger = log4js.getLogger('airbnb_user');
fileLogger.setLevel('TRACE');

function logToFile(data, err){
    if(err){
        fileLogger.error(err);
    }else {
        if(data.category == 'property_clicks'){
            fileLogger.trace('Property '+ data.key + ' clicked by user '+ data.user_id);
        }else if(data.category == 'page_clicks'){
            fileLogger.trace('Page '+ data.key + ' clicked by user '+ data.user_id);
        }
    }
}

function logToDb(data, err){
    var dbLogger = log4js.getLogger(data.category);
    if(err){

    }else {
        if(data.category == 'property_clicks'){
            var getLocationQuery = 'SELECT city FROM property WHERE property_id ='+ data.key;
            var logData = {property_id: data.key, host_id: data.host_id, user_id: data.user_id, msg: 'Property '+ data.key + ' clicked by user '+ data.user_id};
            dbLogger.info(logData);
            mysql.performOperation(getLocationQuery, function (error, result) {
                if(error){
                    fileLogger.error('Error logging to data '+ error);
                }else if(result.rows.length > 0) {
                    logData = {area: result.rows[0].city, host_id: logData.host_id, user_id: logData.user_id, msg: 'Property in area '+ result.rows[0].city + ' clicked by user '+ data.user_id};
                    dbLogger.info(logData);
                }
            });
        }else if(data.category == 'page_clicks') {
            var logData = {page_name: data.key, host_id: data.host_id, user_id: data.user_id, msg: 'Page '+ data.key + ' clicked by user '+ data.user_id};
            dbLogger.info(logData);
        }
    }
}

exports.logToFile = logToFile;
exports.logToDb = logToDb;

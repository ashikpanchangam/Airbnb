/**
 * Created by rishi on 11/23/16.
 */

var log4js = require('log4js');
var mongoAppender = require('log4js-node-mongodb');

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

function logToFile(msg, err){
    if(err){
        fileLogger.error(msg);
    }else {
        fileLogger.trace(msg);
    }
}

function logToDb(data, err){
    var dbLogger = log4js.getLogger(data.category);
    if(err){

    }else {
        dbLogger.info({key: data.key, msg: data.msg});
    }
}

exports.logToFile = logToFile;
exports.logToDb = logToDb;

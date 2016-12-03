/**
 * Created by rishi on 12/3/16.
 */

var logger = require('../helpers/logger');

function logData(msg, callback) {
    logger.logToDb(msg, null);
    logger.logToFile(msg, null);
}

exports.handle_log_data = function(msg, callback) {
    switch (msg.action){
        case 'LOG_DATA':
            logData(msg.content, callback);
            break;
        default:
            callback(null, {statusCode: 400});
            break;

    }
};

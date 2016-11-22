/**
 * Created by ASHIK'S PC on 11/20/2016.
 */

var mongo = require('../db/mongo');
var mongodb = require('mongodb');
var mysql = require('../db/mysql');

function userSignUp(msg, callback){

    mysql.signUp(msg, 'userSignUp', function (result) {
        if (result === false) {
            callback(null, {})
        } else {
            callback(null, result)
        }
    })
}

function becomeHost(msg, callback) {
    
    mysql.signUp(msg,'becomeHost', function (result) {
        if(result ===false){
            callback(null, {})
        }else {
            callback(null,result)
        }
    })
}

exports.userSignUp = userSignUp;
exports.becomeHost = becomeHost;
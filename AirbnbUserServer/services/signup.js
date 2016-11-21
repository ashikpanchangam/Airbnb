/**
 * Created by ASHIK'S PC on 11/20/2016.
 */

var mongo = require('../db/mongo');
var mongodb = require('mongodb');
var mysql = require('../db/mysql');

function userSignUp(msg, callback){

    mysql.userSignUp(msg, 'signUp', function (result) {
        if (result === false) {

        } else {
            callback(null, result)
        }
    })
}

exports.userSignUp = userSignUp;
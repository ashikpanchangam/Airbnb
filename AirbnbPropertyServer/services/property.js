/**
 * Created by longnguyen on 11/2/16.
 */

var mongo = require('../db/mongo')
var mongodb = require('mongodb');
var mysql = require('../db/mysql')
var async = require('async')

function search(msg, callback){
    console.log("[PROPERTY SERVER] search ", msg)
    mysql.operate(msg, 'searchProperty', function (result) {
        if (result === false) {
            callback(null, {})
        } else {
            async.each(result,
                function (property, cb) {
                    mysql.operate(property, 'reviewAndRating', function (r) {
                        if (r == false) {
                            property.review_num = 0;
                            property.rating = 0;
                        } else {
                            property.review_num = r.review_num;
                            property.rating = r.rating;
                        }
                        cb();
                    })

                },

                function () {
                    console.log('searchResult', result)
                    callback(null, result)
                }
            );
        }
    })
}

function getDetail(msg, callback){

    console.log("[PROPERTY SERVER] getDetail ", msg)

    switch (msg.action)
    {
        case 'GET_INFO':
            getInfo(msg.content, callback)
            break
        case 'GET_REVIEW':
            getReview(msg.content, callback)
            break
        default:
            callback(null, {code: 404})
    }
}

var getInfo = function(req, callback) {
    mysql.operate(req, 'getProperty', function (result) {
        if (result === false) {
            callback(null, {})
        } else {
            //TODO: store to redis for caching
            callback(null, result)
        }
    })
}

var getReview = function(req, callback) {
    mysql.operate(req, 'getReview', function (result) {
        if (result === false) {
            callback(null, {})
        } else {
            callback(null, result)
        }
    })
}

exports.search = search;
exports.getDetail = getDetail;
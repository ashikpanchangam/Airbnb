/**
 * Created by longnguyen on 11/2/16.
 */

var mongo = require('../db/mongo')
var mysql = require('../db/mysql')
var async = require('async')
var redis = require('../db/redis')

function digit() {
    return Math.floor(Math.random() * 10);
}

function guid() {
    return digit() + digit() + digit() + '-' + digit() + digit() + '-' + digit() + digit() + digit() + digit()
}

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

function detail(msg, callback){

    console.log("[PROPERTY SERVER] getDetail ", msg)

    switch (msg.action)
    {
        case 'GET_INFO':
            getInfo(msg.content, callback)
            break
        case 'GET_REVIEW':
            getReview(msg.content, callback)
            break
        case 'ADD_PROPERTY':
            addProperty(msg.content, callback)
            break
        case 'ADD_REVIEW':
            addReview(msg.content, callback)
            break
        case 'ADD_PROPERTY_IMAGE':
            addPropertyImage(msg.content, callback)
            break
        case 'GET_PROPERTY_IMAGES':
            getPropertyImages(msg.content, callback)
            break
        case 'ADD_PROPERTY_REVIEW_IMAGE':
            addPropertyReviewImage(msg.content, callback)
            break
        case 'GET_PROPERTY_REVIEW_IMAGES':
            getPropertyReviewImages(msg.content, callback)
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
            redis.cacheProperty(result)

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

var addProperty = function(req, callback) {
    req.quantity = 1;
    req.property_id = guid();
    msg.property_approved = 0
    mysql.operate(req, 'addProperty', function (result) {
        if (result == null) {
            callback(null, {})
        } else {
            callback(null, {statusCode: 200})
        }
    })
}

var addReview = function(req, callback) {
    mysql.operate(req, 'addReview', function (result) {
        if (result == null) {
            callback(null, {})
        } else {
            callback(null, {statusCode: 200})
        }
    })
}

var addPropertyImage = function(req, callback) {
    const i = {
        id: req.property_id,
        name: req.name,
        data: req.data
    }
    mongo.storeImage(i, function () {
        callback(null, {statusCode: 200})
    })
}

var getPropertyImages = function(req, callback) {
    const i = {
        id: req.property_id
    }
    mongo.getImage(i, function (docs) {
        callback(null, docs)
    })
}

var addPropertyReviewImage = function(req, callback) {
    const i = {
        id: req.property_id + "_" + req.review_id,
        name: req.name,
        data: req.data
    }
    mongo.storeImage(i, function () {
        callback(null, {statusCode: 200})
    })
}

var getPropertyReviewImages = function(req, callback) {
    const i = {
        id: req.property_id+ "_" + req.review_id,
    }
    mongo.getImage(i, function (docs) {
        callback(null, docs)
    })
}
exports.search = search;
exports.detail = detail;
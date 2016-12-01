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
    var res = []
    mysql.operate(msg, 'searchProperty', function (result) {
        if (result === false) {
            callback(null, [])
        } else {
            async.each(result,
                function (property, cb) {
                    //get number of review and avg rating
                    mysql.operate(property, 'reviewAndRating', function (r) {
                        var review_rating = {}
                        if (r == false) {
                            review_rating.review_num = 0;
                            review_rating.rating = 0;
                        } else {
                            review_rating.review_num = r.review_num;
                            review_rating.rating = r.rating;
                        }

                        //get photos of property
                        getPropertyImages({property_id: property.property_id}, function(e, images) {
                            var search_element = {
                                property_detail: property,
                                review_and_rating: review_rating,
                                images: images
                            }
                            res.push(search_element)
                            cb();
                        })

                    })

                },

                function () {
                    console.log('searchResult', res)
                    callback(null, res)
                }
            );
        }
    })
}

function detail(msg, callback){

    console.log("[PROPERTY SERVER] detail ", msg)

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
    req.property_id = guid();
    req.property_approved = 0
    mysql.operate(req, 'addProperty', function (result) {
        if (result == null) {
            callback(null, {statusCode: 400})
        } else {
            callback(null, {
                statusCode: 200,
                content: {
                    property_id: req.property_id
                }
            })
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

function analysis(msg, callback){

    console.log("[PROPERTY SERVER] analysis ", msg)

    switch (msg.action)
    {
        case 'TOP_10_PROPERTY_REVENUE':
            top10PropertyRevenue(msg.content, callback)
            break
        case 'TOP_10_CITY_REVENUE':
            top10CityRevenue(msg.content, callback)
            break
        default:
            callback(null, {statusCode: 400})
    }
}

var top10PropertyRevenue = function(req, callback) {
    mysql.operate(req, 'top10PropertyRevenue', function (result) {
        if (result === false) {
            callback(null, [])
        } else {
            callback(null, result)
        }
    })
}


var top10CityRevenue = function(req, callback) {
    mysql.operate(req, 'top10CityRevenue', function (result) {
        if (result === false) {
            callback(null, [])
        } else {
            callback(null, result)
        }
    })
}

exports.search = search;
exports.detail = detail;
exports.analysis = analysis;
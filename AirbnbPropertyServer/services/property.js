/**
 * Created by longnguyen on 11/2/16.
 */

var mongo = require('../db/mongo')
var mongodb = require('mongodb');
var mysql = require('../db/mysql')
var async = require('async')

function search(msg, callback){

    // const col = mongo.collection('items')
    // col.find({userId: { $ne: msg.userId }}).toArray(function(err, docs) {
    //     console.log('[SERVER] get_all_items', docs)
    //     if (docs.length == 0) {
    //         callback(null, {code: 404})
    //     } else {
    //         callback(null, docs)
    //     }
    // });

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

exports.search = search;
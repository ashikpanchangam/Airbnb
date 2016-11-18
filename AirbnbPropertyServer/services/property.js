/**
 * Created by longnguyen on 11/2/16.
 */

var mongo = require('../db/mongo')
var mongodb = require('mongodb');
var mysql = require('../db/mysql')

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

        } else {
            callback(null, result)
        }
    })
}

exports.search = search;
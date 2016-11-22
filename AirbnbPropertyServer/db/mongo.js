/**
 * Created by longnguyen on 10/19/16.
 */

var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
const url = "mongodb://ec2-54-212-241-30.us-west-2.compute.amazonaws.com/AirbnbMongo"

var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// img path
var imgPath = './image.png';

// MongoClient.connect(url, {
//     server: {
//         poolSize: 20
//     }
// },function(err, _db){
//     if (err) { throw new Error('Could not connect: '+err); }
//     db = _db;
//     connected = true;
//     console.log(connected +" is connected?");
// });
//
//
// var collection = function(name) {
//     if (!connected) {
//         throw new Error('Must connect to Mongo before calling "collection"');
//     }
//     return db.collection(name);
// };
//
// exports.collection = collection

mongoose.connect(url)
var schema = new mongoose.Schema({
    id: String,
    img: {
        name: String,
        data: Buffer,
        contentType: String}
})
var Image = mongoose.model('Image', schema);



var storeImage = function(i, callback) {
    var image = new Image;
    image.id = i.id
    image.img.name = i.name
    image.img.data = i.data
    image.img.contentType= 'image/png'


    image.save(function (err) {
        if (err) throw err;
        // saved!
        console.log('image saved!')
        callback()
    })
}

var getImage = function(i, callback) {
    Image.find({id: i.id}, function (err, docs) {
        if (err) throw err;
        console.log('image', docs)
        callback(docs)
    })
}

exports.storeImage = storeImage
exports.getImage = getImage
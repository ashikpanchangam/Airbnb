var MongoClient = require('mongodb').MongoClient;
var mongoConnectURL = "mongodb://localhost:27017/AirbnbMongo?maxPoolSize=500";
var db;
var connected = false;

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(callback){
    MongoClient.connect(mongoConnectURL, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err); }
        db = _db;
        connected = true;
        console.log(connected +" is connected?");
        callback(db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
        console.err('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};

exports.closeConn = function () {
    console.log("Closing mongo connection");
    db.close();
};
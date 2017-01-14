/**
 * Created by longnguyen on 11/20/16.
 */
var redis = require('redis');
var client = redis.createClient(6379, '');

client.on('connect', function() {
    console.log('redis connected'); 
});

var cacheProperty = function(property) {
    console.log('redis cache key ', property.property_id)
    client.hmset(property.property_id, property)
}

exports.cacheProperty = cacheProperty
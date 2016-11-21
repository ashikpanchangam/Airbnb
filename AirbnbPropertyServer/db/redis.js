/**
 * Created by longnguyen on 11/20/16.
 */
var redis = require('redis');
var client = redis.createClient(6379, 'ec2-54-212-241-30.us-west-2.compute.amazonaws.com');

client.on('connect', function() {
    console.log('redis connected');
});

var cacheProperty = function(property) {
    console.log('redis cache key ', property.property_id)
    client.hmset(property.property_id, property)
}

exports.cacheProperty = cacheProperty
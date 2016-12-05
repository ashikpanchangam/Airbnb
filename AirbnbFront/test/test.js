var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http");


describe('Request tests', function() {
    it('testing rooms', function(done) {
        request.get(
            'http://localhost:3000/rooms/20-44-6081',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('testing signup', function(done) {
        request.get(
            'http://localhost:3000/signup',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
});
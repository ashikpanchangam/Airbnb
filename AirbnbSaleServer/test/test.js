/**
 * Created by rishi on 11/16/16.
 */

var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http");


describe('Request tests', function() {
    it('Get room with ID', function (done) {
        request.get(
            'http://localhost:3000/rooms/20-44-6081',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('Get host analytics data', function (done) {
        request.get(
            'http://localhost:3000/hostAnalytics/',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('Get user profile data', function (done) {
        request.get(
            'http://localhost:3000/profile/',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('Get listing information', function (done) {
        request.get(
            'http://localhost:3000/listingInfo/...',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('Get dashboard data', function (done) {
        request.get(
            'http://localhost:3000/dashboard',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
});
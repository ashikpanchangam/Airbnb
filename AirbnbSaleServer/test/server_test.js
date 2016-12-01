/**
 * Created by rishi on 11/23/16.
 */

var bids = require('../services/bids');
var trips = require('../services/trips');
var bills = require('../services/bill');

// Dummy Ids added
var testUserId = '345212653';
var testPropertyId = '340212050';
var testHostId = '345210000';

// Generated ID
var testTripId = '818-57-5671';

var postBidMsg = {action: 'POST_BID', content: {user_id: testUserId, property_id: testPropertyId, bid_amount: 10}};
var traceBidMsg = {action: 'TRACE_BID', content: {user_id: testUserId}};
var getBidsForPropertyMsg = {action: 'GET_PROPERTY_BID', content: {user_id: testUserId, property_id: testPropertyId}};

var createTripMsg = {action: 'CREATE_TRIP', content: {user_id: testUserId, property_id: testPropertyId, host_id: testHostId, guests: 2,
                    total: 120, check_in: '11/24/2016', check_out: '11/30/2016'}};

var editTripMsg = {action: 'EDIT_TRIP', content: {bill_total: 200, check_in: '12/02/2016', check_out: '12/04/2016', trip_id: testTripId}};
var deleteTripMsg = {action: 'DELETE_TRIP', content: {trip_id: testTripId}};
var getTripsForHostMsg = {action: 'GET_TRIPS_HOST', content: {host_id: testHostId}};
var getTripsForUserMsg = {action: 'GET_TRIPS_USER', content: {user_id: testUserId}};

var generateBillMsg = {action: 'GENERATE_BILL', content: {trip_id: testTripId}};

function executeInsertTests() {
    // Testing posting a bid
    // bids.handle_bid_queue(postBidMsg, function(err, result) {
    //     if(err){
    //         console.log("Error "+ err);
    //     }
    //     console.log('Result ' + JSON.stringify(result));
    // });

    // Testing to create a trip
    trips.handle_trip_queue(createTripMsg, function (err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Result for trips' + JSON.stringify(result));
    });
}

function executeGetTests(){
    // Testing trace bids
    bids.handle_bid_queue(traceBidMsg, function(err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Trace Bid ' + JSON.stringify(result));
    });

    // Testing bids for property
    bids.handle_bid_queue(getBidsForPropertyMsg, function(err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Bids for property ' + JSON.stringify(result));
    });

    // Test to fetch all the trips for user
    trips.handle_trip_queue(getTripsForHostMsg, function (err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Trips for host ' + JSON.stringify(result));
    });

    // Test to fetch all the trips for user
    trips.handle_trip_queue(getTripsForUserMsg, function (err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Trips for user ' + JSON.stringify(result));
    });

    // Testing for fetching the bill
    bills.handle_bill_queue(generateBillMsg, function (err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Generate bill ' + JSON.stringify(result));
    });
}

function executeUpdateTests() {
    trips.handle_trip_queue(editTripMsg, function (err, result) {
        if(err){
            console.log("Error "+ err);
        }
        console.log('Result ' + JSON.stringify(result));
    });
}

function executeDeleteTests() {
    trips.handle_trip_queue(deleteTripMsg, function(err, result){
        if(err){
            console.log("Error "+ err);
        }
        console.log('Result ' + JSON.stringify(result));
    });
}

exports.executeDeleteTests  = executeDeleteTests;
exports.executeUpdateTests  = executeUpdateTests;
exports.executeGetTests  = executeGetTests;
exports.executeInsertTests  = executeInsertTests;
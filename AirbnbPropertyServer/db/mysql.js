/**
 * Created by longnguyen on 9/29/16.
 */
var mysql = require("mysql");
var async = require("async");
var dateFormat = require('dateformat');

var pool    =   mysql.createPool({
    connectionLimit : 20,
    host     : '',
    user     : '',
    password : '',
    database : '',
    debug    :  false
});

function operate(msg,type,callback) {
    async.waterfall([
            function(callback) {
                pool.getConnection(function(err,connection){

                    if(err) {
                        callback(err, true);
                    } else {
                        callback(null,connection);
                    }
                });
            },
            function(connection,callback) {
                var query;
                switch(type) {
                    case "searchProperty":
                        var subQ = ''
                        for (var i = 1; i < msg.category.length; i++) {
                                subQ = subQ + ' OR category=' + connection.escape(msg.category[i].type)
                        }

                        query = 'select * from (select * from property left join trip on property_id=trip_property_id) t ' +
                            'where (category=' + connection.escape(msg.category[0].type) + subQ + ')'+
                                ' AND city=' + connection.escape(msg.city) +
                                ' AND accommodates >=' +  connection.escape(msg.guests) +
                                ' AND price <= ' + connection.escape(msg.max_price) +
                                ' AND price >= ' + connection.escape(msg.min_price) +
                                ' AND (check_in IS NULL ' +
                                    'OR check_in >' + connection.escape(msg.checkout) +
                                    'OR check_out <' + connection.escape(msg.checkin)  + ')';
                        break;
                    case "reviewAndRating":
                        query = 'select review_property_id, count(*) review_num, avg(ratings) rating from review ' +
                            'where review_property_id=' + connection.escape(msg.property_id) +
                            ' group by review_property_id';
                        break;
                    case "getProperty":
                        query = 'select * from property ' +
                            'where property_id=' + connection.escape(msg.property_id);
                        break;
                    case "getUserProperties":
                        query = 'select * from property ' +
                            'where property_host_id=' + connection.escape(msg.property_host_id);
                        break;
                    case "getReview":
                        query = 'select * from review ' +
                            'where review_property_id=' + connection.escape(msg.property_id);
                        break;
                    case "addProperty":
                        query = 'INSERT into property(property_id,property_name,category,address,city,state,zip_code,country,accommodates,beds,bathrooms,amenities,price,description,property_host_id,property_approved,is_bidding,create_time,lat,lng) VALUES (' +
                            connection.escape(msg.property_id) +','+ connection.escape(msg.property_name) +','+ connection.escape(msg.category)
                            + ',' + connection.escape(msg.address) +','+connection.escape(msg.city)
                            + ',' + connection.escape(msg.state) +','+connection.escape(msg.zip_code)
                            + ',' + connection.escape(msg.country) +','+connection.escape(msg.accommodates)
                            + ',' + connection.escape(msg.beds) +','+connection.escape(msg.bathrooms)
                            + ',' + connection.escape(msg.amenities)
                            + ',' + connection.escape(msg.price) +','+connection.escape(msg.description)
                            + ',' + connection.escape(msg.property_host_id) +','+connection.escape(msg.property_approved)
                            + ',' + connection.escape(msg.is_bidding) +','+ connection.escape(getCurrentDateTime())
                            + ',' + connection.escape(msg.lat) +','+ connection.escape(msg.lng)
                            + ')';
                        break;
                    case "addReview":
                        query = 'INSERT into review(reviews,ratings,review_property_id) VALUES (' +
                            connection.escape(msg.reviews) +','+connection.escape(msg.ratings)
                            + ',' + connection.escape(msg.review_property_id)
                            + ')';
                        break;
                    case "top10PropertyRevenue":
                        query = 'select property_id as anme, sum(total) revenue from property,trip ' +
                            ' where property_id=trip_property_id'+
                            ' group by property_id' +
                            ' order by revenue DESC' +
                            ' LIMIT 10';
                        break;
                    case "top10CityRevenue":
                        query = 'select city as name, sum(total) revenue from property,trip ' +
                            ' where property_id=trip_property_id'+
                            ' group by city' +
                            ' order by revenue DESC' +
                            ' LIMIT 10';
                        break;
                    case "top10UserRevenue":
                        query = 'select email as name, sum(total) revenue from user,trip ' +
                            ' where user_id=trip_host_id'+
                            ' group by user_id' +
                            ' order by revenue DESC' +
                            ' LIMIT 10';
                        break;
                    default :
                        break;
                }
                callback(null,connection,query);
            },
            function(connection,query,callback) {
                connection.query(query,function(err,rows){
                    console.log('Mysql operator: conn_id= ' + connection.threadId + ' query= ' + query);
                    connection.release();
                    if(!err) {
                        console.log(rows);
                        if(type === "reviewAndRating" || type === "getProperty") {
                            callback(null, rows.length === 0 ? false : rows[0]);
                        } else if(type === "searchProperty" || type === "getReview" || type === "top10PropertyRevenue"
                            || type === "top10CityRevenue" || type === "top10UserRevenue" || type === "getUserProperties") {
                            callback(null, rows.length === 0 ? false : rows);
                        } else {
                            console.log('Query type: ' + type);
                            callback(null, true);
                        }
                    } else {
                        callback(err, true);
                    }
                });
            }],
        function(err, result){
            console.log('Query err: ',  err)
            console.log('Query result: ', result);
            if(err) {
                callback(null);
            } else {
                callback(result);
            }
        });
}

function getCurrentDateTime(){
    var now = new Date();
    return dateFormat(now, "yyyy-mm-dd h:MM:ss");
}

function getDynamicPrice(actualPrice){
    var date = getCurrentDateTime();
    var mongoLogs = mongo.collection('airbnb_logs');
    var dateColl = mongo.collection('price_dates');
    mongoLogs.aggregate([
        {$match: {"data.property_id": {"$exists": true, "$ne": null}, "data.host_id": {"$eq": msg.host_id}, "timestamp": new Date()}},
        {$group: {_id: "$data.property_id", clicks: {$sum: 1}}}], function (err, result) {
        if(err){
            return actualPrice;
        }
        dateColl.find({date: date}, function (err, document) {
            var propertyClickCount = result.clicks;
            if(propertyClickCount > 1000 && propertyClickCount < 5000 || document.date.indexOf(date)){
                return actualPrice * 1.1;
            }else if(propertyClickCount > 5000 && propertyClickCount < 10000 || document.date.indexOf(date)){
                return actualPrice * 1.2;
            }else if(propertyClickCount < 10){
                return actualPrice * 0.9;
            }
        });

    });
}

exports.operate = operate;
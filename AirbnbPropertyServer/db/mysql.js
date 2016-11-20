/**
 * Created by longnguyen on 9/29/16.
 */
var mysql = require("mysql");
var async = require("async");

var pool    =   mysql.createPool({
    connectionLimit : 20,
    host     : 'ec2-54-212-241-30.us-west-2.compute.amazonaws.com',
    user     : 'cmpe273',
    password : 'cmpe273',
    database : 'airbnb_mysql',
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
                        query = 'select * from (select * from property left join bill on property_id=bill_property_id) t ' +
                            'where category=' + connection.escape(msg.category) +
                                ' AND city=' + connection.escape(msg.city) +
                                ' AND state=' + connection.escape(msg.state) +
                                ' AND accommodates >=' +  connection.escape(msg.guests) +
                                ' AND price <= ' + connection.escape(msg.max_price) +
                                ' AND price >= ' + connection.escape(msg.min_price) +
                                ' AND (from_date IS NULL ' +
                                    'OR from_date >' + connection.escape(msg.checkout) +
                                    'OR to_date <' + connection.escape(msg.checkin)  + ')';
                        break;
                    case "reviewAndRating":
                        query = 'select review_property_id, count(*) review_num, avg(ratings) rating from review ' +
                            'where review_property_id=' + connection.escape(msg.property_id) +
                            ' group by review_property_id';
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

                        if(type === "reviewAndRating") {
                            callback(null, rows.length === 0 ? false : rows[0]);
                        } else if(type === "searchProperty" ) {
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

exports.operate = operate
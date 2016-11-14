var mongo = require("./mongo");
var mongoURL = "mongodb://ec2-54-212-241-30.us-west-2.compute.amazonaws.com:27017/AirbnbMongo";

function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);

	if(msg.operationType == "login") 
	{
		mongo.connect(mongoURL, function(db){
			console.log('Connected to mongo at: ' + mongoURL);
			var col = db.collection('users');

			col.find({username : msg.username, password : msg.password}).limit(1).toArray(function(err, user){
				if (user.length > 0)
                {
					res.code = "200";
					res.value = "Successfully logged in";
					callback(null, res);

				} 
                else
                {
					res.code = "401";
					res.value = "Unauthorized";
					callback(null, res);
				}
			});
		});
	}
	else if(msg.operationType == "register")
    {
		mongo.connect(mongoURL, function(db){
			db.collection('users').insert({username: msg.username, password: msg.password}, function(err, doc){
				res.code = "200";
				res.value = "Successfully logged in";
				callback(null, res);
			});
		});
	}
}

exports.handle_request = handle_request;
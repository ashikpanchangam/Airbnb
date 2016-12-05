var mq_client = require('../../rpc/client');

exports.createHost = function(req,res) {
    var msg_payload = {
        "action":"ADD_PROPERTY",
        "content": req.body.content
    };
    var propertyImages = req.body.images;
    // console.dir(msg_payload);
    // console.dir(propertyImages);
    var totalImages = Object.keys(propertyImages).length;
    var imagesKeys = Object.keys(propertyImages);
    var imageResponses = []; var completedImages = 0;
    mq_client.make_request('property_detail_queue', msg_payload, function (err, results) {
        if(err){
            throw err;
        }
        console.log(results);

        if(results.statusCode == 200) {
            var propertyId = results.content.property_id;
            for(var i = 0; i < totalImages; i++) {
                if(propertyImages[imagesKeys[i]].datauri != '') {
                    var imgMsgPayload = {
                        "action": "ADD_PROPERTY_IMAGE",
                        "content": {
                            property_id: propertyId,
                            name: propertyImages[imagesKeys[i]].filename,
                            data: propertyImages[imagesKeys[i]].datauri
                        }
                    };
                    mq_client.make_request('property_detail_queue', imgMsgPayload, function (err, results) {
                        if (err) {
                            throw err;
                        }
                        imageResponses.push(results);
                        completedImages++;
                        if(completedImages == totalImages) {
                            res.send({statusCode:200});
                        }
                    });
                }
                else {
                    completedImages++;
                    if(completedImages == totalImages) {
                        res.send({statusCode:200});
                    }
                }
            }
        }
        // res.send({statusCode:200});
    })
};

exports.signIn = function (req,res) {
    var data = {
        "action":"USER_LOGIN",
        "content": {
            email: req.body.email,
            password: req.body.password
        }
    };
    mq_client.make_request('signUp_queue', data, function (err, results) {
        if(err){
            throw err;
        }
        if(results.statusCode == 200) {
            req.session.userId = results.results[0].user_id;
            req.session.userName = results.results[0].first_name;
            req.session.currentUser = results.results[0];
            res.json({statusCode: 200});
        }
        else
            res.json({statusCode:400});
    })
};

exports.signUp = function (req,res) {
    var data = {
        "action":"USER_SIGN_UP",
        "content": {
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob
        }
    };
    mq_client.make_request('signUp_queue', data, function (err, results) {
        if(err){
            throw err;
        }
        console.log(results);
        res.send(results);
    })
};

exports.getSession = function (req,res) {
    res.json(req.session);
};

exports.doLogout = function (req,res) {
    req.session.destroy();
    res.json({statusCode:200});
};

exports.search = function (req, res) {
    var data = {
        category: [{type:"Entire place"}, {type:"Private room"}, {type:"Shared room"}],
        city:"san jose",
        checkin: "2012-11-11",
        checkout: "2012-11-13",
        guests: 1,
        max_price: 10000000,
        min_price: 0
    };
    mq_client.make_request('property_search_queue', data, function (err, myResults) {
        if(err){
            throw err;
        }
        // console.dir(results);
        var searchResults = {results_json:{search_results:[]}};
        var idsArray = [];
        for(var i = 0; i < myResults.length; i++) {
            var obj = {listing: {}, pricing_quote: {rate:{}}, viewed_at: null};
            obj.listing.lat = myResults[i].property_detail.lat;
            obj.listing.lng = myResults[i].property_detail.lng;
            obj.listing.name = myResults[i].property_detail.property_name;
            obj.listing.star_rating = myResults[i].review_and_rating.rating;
            obj.listing.room_type = myResults[i].property_detail.category;
            obj.listing.id = myResults[i].property_detail.property_id;
            idsArray.push(myResults[i].property_detail.property_id);
            obj.pricing_quote.rate.amount = myResults[i].property_detail.price;
            obj.listing.picture_url = null;
            obj.listing.picture_urls = [];
            if(myResults[i].images.length > 0) {
                for(var j = 0; j < myResults[i].images.length; j++) {
                    if(j == 0)
                        obj.listing.picture_url = myResults[i].images[j].img.data;
                    obj.listing.picture_urls.push(myResults[i].images[j].img.data);
                }
            }
            searchResults.results_json.search_results.push(obj);
        }
        searchResults.location = "San Jose";
        searchResults.startDate = req.body.startDate;
        searchResults.endDate = req.body.endDate;
        searchResults.numGuests = req.body.numGuests;
        searchResults.property_ids = idsArray;

        // console.dir(searchResults.results_json.search_results);

        res.json(searchResults);

        // req.session.searchResults = searchResults;
    })
};

exports.getListingInfo = function(req,res) {
    // console.log(req.params);
    // airbnb.getInfo(req.params.rid).then(function (info) {
    //   console.log("info: ", info);
    //   res.json(info);
    // });

    var data = {
        "action":"GET_INFO",
        "content": {
            "property_id": req.params.rid
        }
    };
    mq_client.make_request('property_detail_queue', data, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send(results);
    });
};

exports.editProfile = function(req,res) {
    console.log("inside edit Profile");
    var data = {
        "action":"EDIT_USER_PROFILE",
        "content": req.body
    };
    data.content.user_id = (req.session.userId == undefined)? '' : req.session.userId;
    console.log(data);
    mq_client.make_request('user_queue', data, function (err, results) {
        if (err) {
            throw err;
        }
        if(results.statusCode == 200) {
            req.session.userId = results.updatedUser[0].user_id;
            req.session.userName = results.updatedUser[0].first_name;
            req.session.currentUser = results.updatedUser[0];
            res.send(results);
        }
        else
            res.send(results);
    });
};
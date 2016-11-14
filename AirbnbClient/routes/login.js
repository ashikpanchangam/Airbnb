var mq_client = require('../rpc/client');

exports.checkLogin = function(req,res){
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    var msg_payload = { "username": username, "password": password, "operationType": "login" };

    console.log("In POST Request = UserName:"+ username+" "+password);

    mq_client.make_request('login_queue', msg_payload, function(err,results){

        console.log(results);

        if(err)
        {
            throw err;
        }
        else
        {
            if(results.code == 200)
            {
                req.session.username = username;
                console.log("Valid Login");
                res.send({"statusCode" : 200});
            }
            else
            {
                console.log("Unauthorized");
                res.send({"statusCode" : 401});
            }
        }
    });
};

//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
    if(req.session.username)
    {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("homepage",{username:req.session.username});
    }
    else
    {
        res.redirect('/');
    }
};

exports.logout = function(req,res)
{
    req.session.destroy();
    res.redirect('/');
};

exports.register = function(req, res){
    var userId = req.body.username;
    var password = req.body.password;

    var msg_payload = { "username": userId, "password": password, "operationType": "register" };

    mq_client.make_request('login_queue', msg_payload, function(err,results){

        console.log(results);

        if(err)
        {
            throw err;
        }
        else    
        {
            if(results.code == 200)
            {
                res.render('login');
            }
            else
            {
                console.log("error inside loginjs register");
            }
        }
    });
};
'use strict';

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var publicPath = __dirname + '/public';
var Schema = mongoose.Schema;
var SignupPerson = mongoose.Schema({
    email: String,
    name: String,
    password: String
});
var SignUp = mongoose.model('gift-exchange-people', SignupPerson);
var MatchPerson = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    matchedName: String,
    matchedEmail: String
});
var Match = mongoose.model('gift-exchange-mixed', SignupPerson);
//Express
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(express.static(publicPath));
app.post('/sign-up', function(req, res) {
    SignUp.find({email: req.body.email}, function(err, results) {
        if (results.length > 0) {
            res.send('That email address has already been used');
        } else {
            new SignUp({email: req.body.email, name: req.body.name, password: req.body.password}).save(function() {
                res.send('You have been signed up, please check back later for your match');
            });
        }
    });
});

app.use('/get-match', function(req, res) {
    //First check they have singed up
    SignUp.find({email: req.body.email}, function(err, signUpResults) {
        if (signUpResults.length === 0) {
            res.send('You must sign up before you can get matches');
        } else {
            Match.find({email: req.body.email, password: req.body.password}, function(err, matchResults) {
                if (matchResults.length === 0) {
                    res.send('The email or password you provided did not match or the matches are not ready yet.');
                } else {
                    res.send(matchResults[0]);
                }
            })
        }
    });
});


//MongoDB
mongoose.connect(require('./config/mongo').db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var server = app.listen(8081, function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Application Running on http://%s:%s', host, port);
    });
});


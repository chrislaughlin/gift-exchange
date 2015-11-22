'use strict';

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');
var sorter = require('./sorter');
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
var Match = mongoose.model('gift-exchange-mixed', MatchPerson);
var Admin = mongoose.Schema({
    email: String,
    name: String
});
var Admins = mongoose.model('gift-exchange-admins', Admin);
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
                    res.send('You have been matched with: ' + matchResults[0].matchedName + ' ' + matchResults[0].email);
                }
            })
        }
    });
});

app.use('/build-matches', function(req, res) {
    //check details
    Admins.find({email: req.body.email, password: req.body.password}, function(err, admins) {
        if (admins.length === 0) {
            res.send('The email or password you provided did not match any admins.');
        } else {
            //Clear matches
            Match.remove({}, function(err) {
                if (err) {
                    res.send(err);
                } else {
                    //Match matches
                    SignUp.find(function(err, results) {
                        var matches = sorter.santa(results.map(function(item) {
                            return item.email;
                        }));
                        _.each(matches, function(match, index) {
                            var signUp = _.find(results, function(signUpItem) {
                                return signUpItem.email === index;
                            });
                            var matchResult = _.find(results, function(matchResults) {
                                return matchResults.email === match;
                            });
                            new Match({
                                email: signUp.email,
                                name: signUp.name,
                                password: signUp.password,
                                matchedName: matchResult.name,
                                matchedEmail: matchResult.email}).save(function(err, saved) {
                                    if (!err) {
                                        console.log("*** Saved ***")
                                    } else {
                                        console.log("*** Failed " + err + " ***");
                                    }
                                });
                        });
                        res.send("Matches complete");
                    });
                }
            })
        }
    })
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


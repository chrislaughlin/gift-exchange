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
    res.send('test match');
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


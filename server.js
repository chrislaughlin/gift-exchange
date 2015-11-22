'use strict';

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var publicPath = __dirname + '/public';
//Express
var app = express();
app.use(express.static(publicPath));
app.use('/sign-up', function(req, res) {
    res.send('test sign-up');
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


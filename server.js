'use strict';

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var publicPath = __dirname + '/public';
app.use(express.static(publicPath));
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


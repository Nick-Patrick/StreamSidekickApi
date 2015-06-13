var express = require('express');
var mongoose = require('mongoose');
var Db = mongoose.db;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

mongoose.connect('mongodb://nick-admin:streamingmovies@ds041032.mongolab.com:41032/streamsidekick');
var db = mongoose.connection;



var AmazonRecentlyAddedMoviesModel = require('./models/amazonRecentlyAddedMoviesModel');
var AmazonMoviesModel = require('./models/amazonMoviesModel');

var app = express();
var port = process.env.PORT || 3000;

var amazonRecentlyAddedMoviesRouter = require('./routes/amazonRecentlyAddedMoviesRouter')(AmazonRecentlyAddedMoviesModel);
var amazonMoviesRouter = require('./routes/amazonMoviesRouter')(AmazonMoviesModel);

app.use(allowCrossDomain);
app.use('/api', amazonRecentlyAddedMoviesRouter);
app.use('/api', amazonMoviesRouter);

app.get('/', function (req, res) {
    res.send('hello');
});

app.listen(port, function () {
    console.log('running on port: ' + port);
});

var express = require('express');
var mongoose = require('mongoose');
var Db = mongoose.db;

mongoose.connect('mongodb://nick-admin:streamingmovies@ds041032.mongolab.com:41032/streamsidekick');
var db = mongoose.connection;



var AmazonRecentlyAddedMoviesModel = require('./models/amazonRecentlyAddedMoviesModel');
var AmazonMoviesModel = require('./models/amazonMoviesModel');

var app = express();
var port = process.env.PORT || 3000;

var amazonRecentlyAddedMoviesRouter = require('./routes/amazonRecentlyAddedMoviesRouter')(AmazonRecentlyAddedMoviesModel);
var amazonMoviesRouter = require('./routes/amazonMoviesRouter')(AmazonMoviesModel);


app.use('/api', amazonRecentlyAddedMoviesRouter);
app.use('/api', amazonMoviesRouter);

app.get('/', function (req, res) {
    res.send('hello');
});

app.listen(port, function () {
    console.log('running on port: ' + port);
});

var express = require('express');

var routes = function (AmazonRecentMovies) {
    var amazonRecentlyAddedMoviesRouter = express.Router();
    amazonRecentlyAddedMoviesRouter.route('/amazonPrime/movies/recentlyAdded')
        .get(function (req, res) {
            AmazonRecentMovies.find(function (err, movies) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(movies);
                }
            })
        });
    return amazonRecentlyAddedMoviesRouter;
};

module.exports = routes;

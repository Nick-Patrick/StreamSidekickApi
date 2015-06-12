var express = require('express');

var routes = function (AmazonMovies) {
    var amazonMoviesRouter = express.Router();
    amazonMoviesRouter.route('/amazonPrime/movies')
        .get(function (req, res) {
            AmazonMovies.find(function (err, movies) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(movies);
                }
            })
        });
    amazonMoviesRouter.route('/amazonPrime/movies/:id')
      .get(function (req, res) {
          var query = {};
          query._id = req.params.id;
          AmazonMovies.find(query, function (err, movie) {
              if (err) {
                  res.status(500).send(err);
              } else {
                  res.json(movie);
              }
          })
      })
    amazonMoviesRouter.route('/amazonPrime/movies/top/:count')
      .get(function (req, res) {
          AmazonMovies.find({}, {}, { sort: {'imdbRating': 'desc'}, limit : req.params.count }, function (err, movies) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(movies);
              }
          });
      });
    amazonMoviesRouter.route('/amazonPrime/movies/:genre')
      .get(function (req, res) {
          var capitalizedGenre = req.params.genre.charAt(0).toUpperCase() + req.params.genre.substring(1);

          var query = { 'genre': new RegExp('^' + capitalizedGenre) };

          AmazonMovies.find(query, function (err, movies) {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(movies);
              }
          });
      });
      amazonMoviesRouter.route('/amazonPrime/movies/:genre/top/:count')
        .get(function (req, res) {
            var capitalizedGenre = req.params.genre.charAt(0).toUpperCase() + req.params.genre.substring(1);

            var query = { 'genre':  { "$regex": capitalizedGenre, "$options": "i" }  };

            AmazonMovies.find(query, {}, { sort: {'imdbRating': 'desc'}, limit: req.params.count }, function (err, movies) {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.json(movies);
                }
            });
        });

    return amazonMoviesRouter;
};

module.exports = routes;

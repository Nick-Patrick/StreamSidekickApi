var express = require('express');

var routes = function (Movie) {
  var movieRouter = express.Router();
  movieRouter.route('/Movies')
      .get(function (req, res) {
          var query = {};

          if (req.query.genre) {
              query.genre = req.query.genre;
          }

          Movie.find(query, function (err, movies) {
              if (err) {
                  res.status(500).send(err);
              } else {
                  res.json(movies);
              }
          });
      });
    return movieRouter;
};

module.exports = routes;

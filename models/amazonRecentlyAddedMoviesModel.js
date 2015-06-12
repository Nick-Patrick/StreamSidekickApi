var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var amazonRecentlyAddedMoviesModel = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    rated: {
        type: String
    },
    released: {
        type: String
    },
    runtime: {
        type: String
    },
    director: {
        type: String
    },
    actors: {
        type: String
    },
    metascore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    rottenMeter: {
        type: String
    },
    recentlyAdded: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('PrimeRecentlyAddedMovies', amazonRecentlyAddedMoviesModel);

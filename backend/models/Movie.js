const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    seatMatrix: {
        type: Array,
        required: true,
    },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
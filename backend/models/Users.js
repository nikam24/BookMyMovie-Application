const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bookingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    seatNumber: [Number],
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bookings: [bookingSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
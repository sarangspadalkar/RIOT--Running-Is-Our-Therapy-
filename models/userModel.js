var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'UserId is mandatory to enter']
    },

    firstName: {
        type: String,
        required: [true, 'First name is mandatory to enter']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is mandatory to enter']
    },
    username: String,
    password: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

module.exports = mongoose.model('User', userSchema);

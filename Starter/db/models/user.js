const mongoose = require('mongoose');

const Userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },

        email: {
            type: String,
            require: true,
        },

        password: {
            type: String,
            require: true,
            maxlength: 10

        },

        Date: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model('User', Userschema);
module.exports = User;

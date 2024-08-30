const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            require: true,
        },

        description: {
            type: String,
            require: true,
            trim: true
        }
    }
);

const product = mongoose.model('product', productSchema)
module.exports = product
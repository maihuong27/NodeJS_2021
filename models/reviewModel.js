const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    review: String,
    rating: Number
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', reviewModel);
const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    review: String,
    ratting: Number
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', reviewModel);
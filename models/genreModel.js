const mongoose = require('mongoose');

const genreModel = new mongoose.Schema({
    name: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Genre', genreModel);
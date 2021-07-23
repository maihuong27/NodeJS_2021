const mongoose = require('mongoose');

const movieModel = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Title cannot be empty']
    },
    duration: Date,
    description: String,
    ratting: Number,
    poster: String,
    genre: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Movie', movieModel);
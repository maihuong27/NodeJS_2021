const mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1
    },
    status: {
        type: String,
        minlength: 1
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);
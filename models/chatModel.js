const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    message: {
        type: String,
        require: [true, 'message cannot be empty']
    },
    test: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Chat', chatModel);
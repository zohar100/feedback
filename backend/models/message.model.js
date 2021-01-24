const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Message", messageSchema);
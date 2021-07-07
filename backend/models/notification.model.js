const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    navigationId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Notification", notificationSchema);
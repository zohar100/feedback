const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    profileImage: {
        url: {type: String},
        filename: {type: String}
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }]
});

module.exports = mongoose.model("User", userSchema);
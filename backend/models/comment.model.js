const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: { type: String },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("Comment", commentSchema);
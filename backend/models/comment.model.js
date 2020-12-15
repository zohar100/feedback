const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: { type: String },
},
{
    timestamps: true,
})

module.exports = mongoose.model("Comment", commentSchema);
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {type: String},
    title: {type: String},
},
{
    timestamps: true,
})

module.exports = mongoose.model("Post", postSchema);

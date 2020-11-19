const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {type: String},
    body: {type: String},
    title: {type: String},
},
{
    timestamps: true,
})

module.exports = mongoose.model("Post", postSchema);

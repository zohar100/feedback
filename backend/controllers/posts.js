const Post = require("../models/post.model");

module.exports.index = async (req, res) => {
    const posts = await Post.find({}).populate('author').populate({
        path: 'comments',
        populate: {
            path:'author'
        }
    });
    res.json(posts)
}
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const catchAsync = require('../utility/catchAsync');

//-----------All Comments-----------//
module.exports.index = catchAsync(async (req, res) => {
    let comments;
    if(req.query.postId) {
        comments = await Comment.find({postId: req.query.postId}).populate('author');
    }else{
        comments = await Comment.find();
    }
    res.json(comments);
});

//-----------Spacific Comment-----------//
module.exports.showCommenet = catchAsync(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
});

//-----------New Comment-----------//
module.exports.newComment = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.postId)
    const comment = {
        author: req.user,
        body: req.body.body,
        postId: post._id
    }
    const newComment = await new Comment(comment)
    await newComment.save()
    post.comments.push(newComment)
    await post.save()
    Comment.populate(newComment, {
        path: "author"
    }).then(comment => {
            res.json(comment)
    })
});

//-----------Delete Comment-----------//
module.exports.deleteComment = catchAsync(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);
    const post = await Post.findById(req.params.postId)
    //find if the author of the comment is the current user
    if(comment.author.equals(req.user)){
        //remove spacific comment from the post array
        const newComments = await post.comments.filter(newComment => !newComment.equals(req.params.commentId))
        post.comments = newComments
        await post.save();
        //delete the comment from the database
        await Comment.findByIdAndRemove(req.params.commentId)
        res.json('Comment removed successfully!')
    }
    else{
        res.status(400).json("Error: " + err)
    }
});
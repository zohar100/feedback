const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Notification = require('../models/notification.model');
const { notificationsBuilder, types } = require('../utility/notificationsBuilder'); 
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
    //find post to push the comment
    const post = await Post.findById(req.params.postId)

    //create new comment and push to post
    const comment = {
        author: req.user,
        body: req.body.body,
        postId: post._id
    }
    const newComment = await new Comment(comment)
    await post.comments.push(newComment._id)
    await newComment.save()
    await post.save()

    //create notification
    const user = await User.findById(req.user)
    const notificationUser = await User.findById(post.author)
    if(!notificationUser._id.equals(req.user)){
        const notification = await new Notification(notificationsBuilder(types.POST_COMMENT, user.username, post._id, user.profileImage.url))
        await notificationUser.notifications.push(notification._id)
        await notification.save()
        await notificationUser.save()

    }
    //create notification and send data
    Comment.populate(newComment, {
        path: "author"
    }).then(async (comment) => {
            res.json(comment)
    })
});

//-----------Delete Comment-----------//
module.exports.deleteComment = catchAsync(async (req, res) => {
    const comment = await Comment.findById(req.params.commentId).populate('author')
    const post = await Post.findById(req.params.postId)
    //find if the author of the comment is the current user
    if(comment.author._id.equals(req.user)){
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
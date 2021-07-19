const Post = require("../models/post.model");
const User = require("../models/user.model");
const Notification = require('../models/notification.model');
const { notificationsBuilder, types } = require('../utility/notificationsBuilder'); 
const catchAsync = require('../utility/catchAsync');

//-----------All Posts-----------//
module.exports.index = catchAsync(async (req, res) => {
  const posts = await Post.find().populate('author')
  .populate({
    path: "comments", // populate comments
    populate: {
       path: "author" // in comments, populate author
    }
  })
    res.json(posts)
});

//-----------New Post-----------//
module.exports.newPost = catchAsync(async (req, res) => {
    const user = await User.findById(req.user)

    const post = {
      author: req.body.author,
      body: req.body.body,
      image: req.body.image,
    };

    if(post.body.length <= 0) {
      res.status(401).json({msg: "You must type somthing!"})
    }
    else{
      const newPost = await new Post(post);
      await newPost.save()
      await Post.populate(newPost, {path: 'author'})
      user.posts.push(newPost._id)
      user.save()
      res.json({post: newPost, msg: 'Add post successfuly'})
    }
});

//-----------Get Spacific Post-----------//
module.exports.showPost = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author').populate({
      path: 'comments',
      populate: {
          path:'author'
      }
    });
    res.json(post)
});

//-----------Edit Post-----------//
module.exports.editPost = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id)
    post.body = req.body.body
    post.image = req.body.image
      
    post.save()
    res.json(post)
});

//-----------Delete Post-----------//
module.exports.deletePost = catchAsync(async (req, res) => {
    const user = await User.findById(req.user)
    const post = await Post.findById(req.params.id)
    //find if the author of the post is the current user
      if(post.author.equals(req.user)){
          //remove spacific post from the user object
            const newPosts = await user.posts.filter(post=> !post.equals(req.params.id));
            user.posts = newPosts;
            await user.save();
          //delete the post from the database
            await Post.findByIdAndDelete(req.params.id)
            res.json("Post deleted!");
        }
        else{
          res.status(400).json("Error: " + err)
        }
});

//-----------Like To Comment/ Remove Like to Post-----------//
module.exports.likePost = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author')
    const postLike = await post.likes.find(like => like.equals(req.user))
    
    const user = await User.findById(req.user)
    const notificationUser = await User.findById(post.author._id)

    if(postLike) {
      post.likes.pull(req.user)
    }else {
      if(!notificationUser._id.equals(user._id)){
        const notification = await new Notification(notificationsBuilder(types.POST_LIKE, user.username, post._id, user.profileImage.url))
        await notification.save()
        await notificationUser.notifications.push(notification._id)
        await notificationUser.save()

      }
      await post.likes.push(req.user)
    }
    await post.save();
    res.json(post);
});
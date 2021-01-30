const router = require("express").Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const isLoggedIn  = require("../middlewares/middleware");

//get all posts
router.get("/", isLoggedIn, (req, res) => {
    Post.find()
    .populate('author')
    .populate({
      path: "comments", // populate comments
      populate: {
         path: "author" // in comments, populate author
      }
    })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//add post
router.post("/new", isLoggedIn, async (req, res) => {
  try{
    const user = await User.findById(req.user)
    const post = {
      author: req.body.author,
      body: req.body.body,
      image: req.body.image,
    };
    if(post.body.length <= 0) {
      res.status(401).json({msg: "You most type somthing!"})
    }else{
      const newPost = await new Post(post);
      await newPost.save()
      await Post.populate(newPost, {path: 'author'})
      user.posts.push(newPost._id)
      user.save()
      res.json({post: newPost, msg: 'Add post successfuly'})
    }

  }catch(err){
    res.status(400).json("Error: " + err)
  }

});

//show spacific post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id).populate('author')
    .then(post => res.json(post))
    .catch(err => res.status(400).json("Error: " + err));
})


//edit post
router.put("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
        (post.body = req.body.body),
        (post.image = req.body.image);

        post.save()
            .then(() => res.json("Post updated!"))
            .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//delete post
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
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
        }else{
          res.status(400).json("Error: " + err)
        }
  

  }catch(err){
      res.status(400).json("Error: " + err)
  }
});

//like to post
router.post('/:id/like', isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id)

  const postLike = await post.likes.find(like => like.equals(req.user))

  if(postLike) {
    post.likes.pull(req.user)
  }else {
    post.likes.push(req.user)
  }
  await post.save();
  res.json(post);
});

//toggle post to spacific users favorite
router.post('/:postId/favorite', isLoggedIn, async (req, res) => {
  try{
    const user = await User.findById(req.user)
  
    const postInFav = await user.favorites.find(post => post.equals(req.params.postId))
  
    if(postInFav) {
      user.favorites.pull(req.params.postId)
    }else {
      user.favorites.push(req.params.postId)
    }
    await user.save();
    const post = await Post.findById(req.params.postId)
    .populate('author')
    .populate({
      path: "comments", // populate comments
      populate: {
         path: "author" // in comments, populate author
      }
    })
    res.json(post);
  }catch(err){
    res.status(400).json("Error: " + err)
  }
})

module.exports = router;
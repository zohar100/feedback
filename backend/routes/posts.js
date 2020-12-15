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
      res.json(newPost)
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
router.get("/edit/:id", (req, res) => {
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
      if(post.author.equals(req.user)){
            console.log(user.posts);
            const newPosts = await user.posts.filter(post=> !post.equals(req.params.id))
              console.log(newPosts)
              user.posts = newPosts;
              await user.save();
              console.log(user)
          Post.findByIdAndDelete(req.params.id)
          .then(post => {
                res.json("Post deleted!");
          })
          .catch(err => res.status(400).json("Error: " + err));
        }else{
          res.status(400).json("Error: " + err)
        }
  

  }catch(err){
      res.status(400).json("Error: " + err)
  }
});

module.exports = router;
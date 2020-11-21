const router = require("express").Router();
const Post = require("../models/post.model");
const { isLoggedIn } = require("../middleware");

//get all posts
router.get("/", (req, res) => {
    Post.find().populate('author')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//add post
router.post("/new", isLoggedIn, (req, res) => {
  const post = {
    author: req.user._id,
    body: req.body.body,
    title: req.body.title,
  };

  const newPost = new Post(post);
  newPost.save()
    .then(() => res.json("Post created"))
    .catch(err => res.status(400).json("Error: " + err));
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
        (post.title = req.body.title);

        post.save()
            .then(() => res.json("Post updated!"))
            .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//delete post
router.delete("/:id", isLoggedIn, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post.author.equals(req.user._id)){
        Post.findByIdAndDelete(req.params.id)
        .then(post => {
              res.json("Post deleted!");
        })
        .catch(err => res.status(400).json("Error: " + err));
      }else{
        res.json("Connot delete this post")
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
    
});

module.exports = router;
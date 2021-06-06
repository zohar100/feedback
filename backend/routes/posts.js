const router = require("express").Router();
const posts = require('../controllers/posts')
const isLoggedIn  = require("../middlewares/middleware");


//get all posts
router.get("/", isLoggedIn, posts.index);

//add post
router.post("/new", isLoggedIn, posts.newPost);

//show spacific post
router.get("/:id", isLoggedIn, posts.showPost)

//edit post
router.put("/:id", isLoggedIn, posts.editPost);

//delete post
router.delete("/:id", isLoggedIn, posts.deletePost);

//like to post
router.post("/:id/like", isLoggedIn, posts.likePost);



module.exports = router;
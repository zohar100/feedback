const router = require("express").Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const comments = require('../controllers/comments');
const isLoggedIn  = require("../middlewares/middleware");

//Add comment
router.post("/:postId", isLoggedIn, comments.newComment);

//Remove Comment
router.delete("/:postId/:commentId", isLoggedIn, comments.deleteComment);


module.exports = router;
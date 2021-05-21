const router = require("express").Router();
const comments = require('../controllers/comments');
const isLoggedIn  = require("../middlewares/middleware");

//All Comments
router.get("/", isLoggedIn, comments.index);

//Spacific Comment
router.get("/:commentId", isLoggedIn, comments.showCommenet);

//Add Comment
router.post("/:postId", isLoggedIn, comments.newComment);

//Remove Comment
router.delete("/:postId/:commentId", isLoggedIn, comments.deleteComment);


module.exports = router;
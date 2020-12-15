const router = require("express").Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const isLoggedIn  = require("../middlewares/middleware");



//Get comments
router.get("/:postId", (req,res) => {
    Post.findById(req.params.postId)
        .then(post => {
            res.json(post.comments)
        })
        .catch(err => {
            res.status(400).json('Cannot post yout comment')
        })
});

//Add comment
router.post("/:postId", isLoggedIn, async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId)
        const comment = {
            author: req.user,
            body: req.body.body
        }
        const newComment = await new Comment(comment)
        await newComment.save()
        post.comments.push(newComment)
        await post.save()
        Comment.populate(newComment, {path: "author"})
            .then(comment => {
                res.json(comment)
            })
    }catch(err) {
        res.status(400).json('Cannot post yout comment')
    }
});


router.delete("/:commentId",  (req, res) => {
    Comment.findByIdAndRemove(req.params.commentId)
        .then(comment => {
            res.json('Comment removed successfully!')
        })
        .catch(err => {
            res.status(400).json('cannot delete your comment')
        })
});


module.exports = router;
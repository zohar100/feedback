const router = require("express").Router();
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const isLoggedIn  = require("../middlewares/middleware");

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

//Remove Comment
router.delete("/:postId/:commentId", isLoggedIn, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        const post = await Post.findById(req.params.postId)
        //find if the author of the comment is the current user
        if(comment.author.equals(req.user)){
            //remove spacific comment from the post object
            const newComments = await post.comments.filter(newComment => !newComment.equals(req.params.commentId))
            post.comments = newComments
            await post.save();
            //delete the comment from the database
            await Comment.findByIdAndRemove(req.params.commentId)
            res.json('Comment removed successfully!')
        }else{
            res.status(400).json("Error: " + err)
          }
    }catch(err){
        res.status(400).json('cannot delete your comment')
    }
});


module.exports = router;
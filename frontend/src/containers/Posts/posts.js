import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './posts.module.css';
import useForm from '../../utilities/useForm';
import PostForm from '../../components/Posts/PostForm/PostForm';
import Posts from '../../components/Posts/Posts';
import * as actions from '../../store/actions/index';

const Feed = () => {
    const dispatch = useDispatch();
    const {user, token} = useSelector(state => state.auth);
    const {posts, loading} = useSelector(state => state.post);

    const { fetchPosts, deletePost,
            addPost, toggleLike,
            addToFavorite, addComment,
            deleteComment } = actions;

    const addPostHandler = () => {
        const post = {
             author: user.id,
             body: postFormValue.body,
             image: postFormValue.image
         }
         dispatch(addPost(post, token))
    }
    const addCommentHandler = (postId) => {
        const comment = {
            body: commentFormValue.body
        }
        dispatch(addComment(comment, postId, token));
    }

    const [postFormValue, setPostInputValue, handlePostSubmit] = useForm(null, null, addPostHandler);
    const [commentFormValue, setCommentInputValue, handleCommentSubmit] = useForm(null, null, addCommentHandler);
    
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(null);

    useEffect(() => {
        if(token !== null){
            dispatch(fetchPosts(token));
        }
    }, [fetchPosts, token, dispatch])

    const showModalHandler = (postId) => {
        setShowModal(prevState => {
            if(prevState === postId) {
                return null;
            }
            return postId;
        });
    }

    const showCommentsHandler = (postId) => {
        setShowComments(prevState => {
            if(prevState === postId) {
                return null;
            }
            return postId;
        })
    }

    const likeClickHandler = (postId) => {
        dispatch(toggleLike(postId, user.id, token));
    }

    const deletePostHandler = (postId) => {
        dispatch(deletePost(postId, token));
    }

    const addToFavoriteHandler = (postId, userId) => {
        dispatch(addToFavorite(token, postId, userId));
    }

    const showCommentModalHandler = (commentId) => {
        setShowCommentModal(prevState => {
            if(prevState === commentId) {
                return null;
            }
            return commentId
        });
    }

    const deleteCommentHandler = (commentId, postId) => {
        dispatch(deleteComment(postId, commentId, token));
    }

        return(
            <div className={classes.Posts}>
                <PostForm 
                    bodyValue={postFormValue.body || ""}
                    imageValue={postFormValue.image || ""}
                    inputValueChanged={setPostInputValue}
                    submitHandler={handlePostSubmit}
                    currentUser={user}/> 
                <Posts
                    posts={posts}
                    loading={loading}
                    currentUser={user}
                    showModal={showModal}
                    showModalHandler={showModalHandler}
                    deletePostHandler={deletePostHandler}
                    showCommentsHandler={showCommentsHandler}
                    likeClickHandler={likeClickHandler}
                    addToFavoriteHandler={addToFavoriteHandler}
                    showComments={showComments}
                    deleteCommentHandler={deleteCommentHandler}
                    showCommentModal={showCommentModal}
                    showCommentModalHandler={showCommentModalHandler}
                    bodyValue={commentFormValue.body || ""}
                    inputValueChanged={setCommentInputValue}
                    commentHandleSubmit={handleCommentSubmit}/>
            </div>
        )
}

export default Feed;
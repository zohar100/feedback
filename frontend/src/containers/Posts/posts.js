import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.css';
import useForm from '../../utilities/useForm';
import PostForm from '../../components/Posts/PostForm/PostForm';
import Posts from '../../components/Posts/Posts';
import * as actions from '../../store/actions/index';

const Feed = props => {
    const addPostHandler = () => {
        const post = {
             author: props.user.id,
             body: postFormValue.body,
             image: postFormValue.image
         }
         props.onAddPost(post, props.token)
    }
    const [postFormValue, setPostInputValue, handlePostSubmit] = useForm(null, null, addPostHandler);

    const addCommentHandler = (postId) => {
        const comment = {
            body: commentFormValue.body
        }
        props.onAddComment(comment, postId, props.token)
    }
     const [commentFormValue, setCommentInputValue, handleCommentSubmit] = useForm(null, null, addCommentHandler);
    
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(null);


    const { onFetchPosts, isAuthenticated, token } = props;

    useEffect(() => {
        if(isAuthenticated){
            onFetchPosts(token);
        }
    }, [onFetchPosts, isAuthenticated, token])

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
        props.onLikePost(postId, props.user.id, props.token)
    }

    const deletePostHandler = (postId) => {
        props.onDeletePost(postId, props.token);
    }

    const addToFavoriteHandler = (postId) => {
        props.onAddToFavorite(postId, props.token)
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
        props.onDeleteComment(postId, commentId, props.token)
    }

        return(
            <div className={classes.Posts}>
                <PostForm 
                    bodyValue={postFormValue.body || ""}
                    imageValue={postFormValue.image || ""}
                    inputValueChanged={setPostInputValue}
                    submitHandler={handlePostSubmit}
                    currentUser={props.user}/> 
                <Posts
                    posts={props.posts}
                    loading={props.loading}
                    currentUser={props.user}
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

const mapStateToProps = state => {
    return{
        user: state.auth.user,
        posts: state.post.posts,
        loading: state.post.loading,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (token) => dispatch(actions.fetchPosts(token)),
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token)),
        onLikePost: (postId, userId, token) => dispatch(actions.toggleLike(postId, userId, token)),
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token)),
        onAddComment: (comment, postId, token) => dispatch(actions.addComment(comment, postId, token)),
        onDeleteComment: (postId, commentId, token) => dispatch(actions.deleteComment(postId, commentId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
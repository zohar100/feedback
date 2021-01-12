import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.css';
import Post from '../../components/Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import AddPost from '../../components/Post/AddPost/AddPost';
import * as actions from '../../store/actions/index';

const Posts = props => {
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null);

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


        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!props.loading) {
            posts = (
            props.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(post => (
                <Post 
                        key={post._id} 
                        userId={post.author._id}
                        username={post.author.username} 
                        body={post.body}
                        image={post.image}
                        createdAt = {post.createdAt}
                        showModal={showModal === post._id ? true : false}
                        modalClicked={() => showModalHandler(post._id)}
                        deletePost={() => deletePostHandler(post._id)}
                        showDeleteButton={post.author._id === props.user.id}
                        commentClick={() => showCommentsHandler(post._id)}
                        showComments={showComments === post._id ? true : false}
                        commentModalClick={() => setShowComments(null)}
                        commentsCount={post.comments.length}
                        likesCount={post.likes.length}
                        likeClick={() => likeClickHandler(post._id)}
                        likeActive={post.likes.find(like => like === props.user.id ? true : false)}
                        addToFavorite={() => addToFavoriteHandler(post._id)}
                        favoriteActive={props.user.favorites.find(favPost => favPost._id === post._id ? true : false)}
                        postId={post._id}
                        post={post}
                />
            ))
            );
        } 

        return(
            <div className={classes.Posts}>
                <AddPost /> 
                {posts}
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
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
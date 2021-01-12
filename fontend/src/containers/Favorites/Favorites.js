import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Favorites.module.css';
import Post from '../../components/Post/Post';
import * as actions from '../../store/actions/index';

const Favorites = props => {
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null); 

    const deletePostHandler = (postId) => {
        props.onDeletePost(postId, props.token);
    }

    const showModalHandler = ( postId) => {
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

    const addToFavoriteHandler = (postId) => {
        props.onAddToFavorite(postId, props.token)
    }


        let posts = props.posts.map(post => (
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
        return(
            <div className={classes.Favorites}>
                <h2>FAVORITES</h2>
                {posts}
            </div>
        )
}

const mapStateToProps = state  => {
    return {
        user: state.auth.user,
        posts: state.auth.user.favorites,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token)),
        onFetchUser: (userId, token) => dispatch(actions.fetchUser(userId, token)),
        onFollowUser: (userId, token) => dispatch(actions.followUser(userId, token)),
        onLikePost: (postId, userId, token) => dispatch(actions.toggleLike(postId, userId, token)),
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
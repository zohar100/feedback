import React from 'react';

import classes from './Posts.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Post from './Post/Post';
import Comments from '../Comments/Comments';
import Hoc from '../../hoc/Hoc/Hoc'

const Posts = ({ posts, loading, currentUser,
                showModal, showModalHandler, 
                deletePostHandler, showCommentsHandler,
                likeClickHandler, addToFavoriteHandler,
                showComments, deleteCommentHandler, showCommentModal,
                showCommentModalHandler, commentBodyValue, commentInputValueChanged,
                commentHandleSubmit, comments
                }) => {
    let postsToShow = <Spinner spinnerType="Primary-Spinner"/>;
    if(!loading) {
        postsToShow = (
        posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(post => (
            <Hoc key={post._id + 'hoc'}>
                <Post 
                    key={post._id} 
                    userId={post.author._id}
                    username={post.author.username} 
                    profileImage={post.author.profileImage}
                    body={post.body}
                    image={post.image}
                    createdAt = {post.createdAt}
                    showModal={showModal === post._id ? true : false}
                    modalClicked={() => showModalHandler(post._id)}
                    deletePost={() => deletePostHandler(post._id)}
                    showDeleteButton={post.author._id === currentUser.id}
                    commentClick={() => showCommentsHandler(post._id)}
                    postOptionClicked={() => showModalHandler(post._id)}
                    commentsCount={post.comments.length}
                    likesCount={post.likes.length}
                    likeClick={() => likeClickHandler(post._id)}
                    likeActive={post.likes.find(like => like === currentUser.id ? true : false)}
                    addToFavorite={() => addToFavoriteHandler(post._id, currentUser.id)}
                    favoriteActive={currentUser.favorites.find(favPost => favPost._id === post._id ? true : false)}
                />
                <Comments
                    key={post._id + 'comments'}
                    showComments={showComments === post._id ? true : false}
                    post={post}
                    deleteCommentHandler={deleteCommentHandler}
                    showCommentModal={showCommentModal}
                    showCommentModalHandler={showCommentModalHandler}
                    userId={currentUser.id}
                    bodyValue={commentBodyValue}
                    inputValueChanged={commentInputValueChanged}
                    handleSubmit={commentHandleSubmit}
                />
            </Hoc>
        ))
        );
    } 

    return (
        <div className={classes.Posts}>{postsToShow}</div>
        )
}

export default Posts
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';

import Post from '../../components/Posts/Post/Post';
import Comments from '../../components/Comments/Comments';
import Hoc from '../../hoc/Hoc/Hoc';
import Spinner from '../../components/UI/Spinner/Spinner';
import useForm from '../../utilities/useForm';
import * as actions from '../../store/actions';

const PostPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { post, loading } = useSelector(state => state.post);
    const { token, user } = useSelector(state => state.auth)

    const { fetchPost, deletePost, addComment,
        addToFavorite, toggleLike, deleteComment } = actions;

    const addCommentHandler = () => {
        const comment = {
            body: commentFormValue.body
        }
        dispatch(addComment(comment, showComments, token));
    }
    
    const [commentFormValue, setCommentInputValue, handleCommentSubmit] = useForm(null, null, addCommentHandler);

    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(null);

    
    const loadData = () => {
        if(params.id){
            if(!post || post._id !== params.id){
                dispatch(fetchPost(token, params.id));
            }
        }
    }

    useEffect(() => {
        loadData()
    }, [dispatch, params, post, fetchPost, token])

    const deletePostHandler = (postId) => {
        dispatch(deletePost(postId, token));
    }

    
    const addToFavoriteHandler = (postId, userId) => {
        dispatch(addToFavorite(token, postId, userId));
    }
    
    const likeClickHandler = (postId) => {
        dispatch(toggleLike(token ,postId, user.id, true));
    }

    const deleteCommentHandler = (postId, commentId) => {
        dispatch(deleteComment(postId, commentId, token));
    }

    const showCommentsHandler = (postId) => {
        setShowComments(prevState => {
            if(prevState === postId) {
                return null;
            }else{
                return postId;
            }
        });
    }

    const showModalHandler = (postId) => {
        setShowModal(prevState => {
            if(prevState === postId) {
                return null;
            }
            return postId;
        });
    }

    const showCommentModalHandler = (commentId) => {
        setShowCommentModal(prevState => {
            if(prevState === commentId) {
                return null;
            }
            return commentId
        });
    }

    let postOrSpinner = <Spinner/>
    if(!loading && post !== null) {
        postOrSpinner =         
        <Hoc>
            <Post 
            userId={post.author._id}
            username={post.author.username} 
            profileImage={post.author.profileImage}
            body={post.body}
            image={post.image}
            createdAt = {post.createdAt}
            showModal={showModal === post._id ? true : false}
            modalClicked={() => showModalHandler(post._id)}
            deletePost={() => deletePostHandler(post._id)}
            showDeleteButton={post.author._id === user.id}
            commentClick={() => showCommentsHandler(post._id)}
            postOptionClicked={() => showModalHandler(post._id)}
            commentsCount={post.comments.length}
            likesCount={post.likes.length}
            likeClick={() => likeClickHandler(post._id)}
            likeActive={post.likes.find(like => like === user.id ? true : false)}
            addToFavorite={() => addToFavoriteHandler(post._id, user.id)}
            favoriteActive={user.favorites.find(favPost => favPost._id === post._id ? true : false)}
        />
        <Comments
            showComments={showComments === post._id ? true : false}
            post={post}
            deleteCommentHandler={deleteCommentHandler}
            showCommentModal={showCommentModal}
            showCommentModalHandler={showCommentModalHandler}
            userId={user.id}
            bodyValue={commentFormValue.body || ""}
            inputValueChanged={setCommentInputValue}
            handleSubmit={handleCommentSubmit}
        />
    </Hoc>
    }

    return(
        <Hoc>
            {postOrSpinner}
        </Hoc>
    )

} 

export default PostPage;
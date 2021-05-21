import axios from '../../axios';

import * as actionTypes from './actionTypes';

//--------------Fetch comments-----------------

export const fetchCommentsStart = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_START
    }
}

export const fetchCommentsSuccess = (comments) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments,
    }
}

export const fetchCommentsFail = (err) => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
        error: err
    }
}

export const fetchComments = ( postId, token) => {
    return dispatch => {
        dispatch(fetchCommentsStart())
        axios.get('/comments?postId=' +  postId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(fetchCommentsSuccess(response.data))
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err.message))
            })
    }
}

//--------------Add comment-----------------

export const addCommentStart = () => {
    return {
        type: actionTypes.ADD_COMMENT_START
    }
}

export const addCommentSuccess = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        comment: comment,
    }
}

export const addCommentFail = (err) => {
    return {
        type: actionTypes.ADD_COMMENT_FAIL,
        error: err
    }
}

export const addComment = (comment, postId, token) => {
    return dispatch => {
        axios.post('/comments/' + postId, comment, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(addCommentSuccess(response.data, postId))
            })
            .catch(err => {
                dispatch(addCommentFail(err.message))
            })
    }
}

//--------------Delete comment-----------------

export const deleteCommentSuccess = (commentId) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        commentId: commentId,
    }
}

export const deleteCommentFail = (err) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
        error: err
    }
}

export const deleteComment = (postId, commentId, token) => {
    return dispatch => {
        axios.delete('/comments/' + postId + '/' + commentId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(deleteCommentSuccess(commentId))
            })
            .catch(err => {
                dispatch(deleteCommentFail(err.message))
            })
    }
}

//--------------Delete comment-----------------

export const clearComments = () => {
    return{
        type: actionTypes.CLEAR_COMMENTS
    }
}
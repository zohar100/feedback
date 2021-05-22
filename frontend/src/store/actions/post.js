import * as actionTypes from './actionTypes';
import axios from '../../axios';


//--------------Fetching posts-----------------
export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START,
    }
}

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts
    }
}

export const fetchPostsFail = (err) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: err
    }
}

export const fetchPosts = (token) => {
    return dispatch => {
        dispatch(fetchPostsStart())
            axios.get('/posts', {headers: { "x-auth-token": token }})
            .then(response => {
                    dispatch(fetchPostsSuccess(response.data));
            })
            .catch(error => dispatch(fetchPostsFail(error)));
    }
}

//--------------Delete post-----------------
export const deletePostSuccess = (postId) => {
    return{
        type: actionTypes.DELETE_POST_SUCCESS,
        postId: postId
    }
}

export const deletePostFail = (err) => {
    return{
        type: actionTypes.DELETE_POST_FAIL,
        error: err
    }
}

export const deletePost = (postId, token) => {
    return dispatch => {
        axios.delete('posts/' + postId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(deletePostSuccess(postId))
            })
            .catch(err => dispatch(deletePostFail(err)));
    }
} 

//--------------Add post-----------------

export const addPostSuccess = (post) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        post: post,
    }
}

export const addPostFail = (err) => {
    return {
        type: actionTypes.ADD_POST_FAIL,
        error: err
    }
}

export const addPost = (post, token) => {
    return dispatch => {
        axios.post('posts/new/', post,  {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(addPostSuccess(response.data.post))
            })
            .catch(err => {
                dispatch(addPostFail(err.response.data.msg))
            });
    }
}



//--------------Likes-----------------
export const toggleLikeSuccess = (postId, userId) => {
    return {
        type: actionTypes.TOGGLE_LIKE_SUCCESS,
        postId: postId,
        userId: userId
    }
}

export const toggleLikeFail = (err) => {
    return {
        type: actionTypes.TOGGLE_LIKE_FAIL,
        error: err
    }
} 

export const toggleLike = (postId, userId, token) => {
    return dispatch => {
        axios.post('posts/' + postId + '/like', null, {headers: { "x-auth-token": token }})
            .then(response => dispatch(toggleLikeSuccess(postId, userId)))
            .catch(err => dispatch(toggleLikeFail(err)));
    }
} 



//--------------Add comment-----------------

export const addCommentStart = () => {
    return {
        type: actionTypes.ADD_COMMENT_START
    }
}

export const addCommentSuccess = (comment, postId) => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        comment: comment,
        postId: postId
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
        axios.post('comments/' + postId, comment, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(addCommentSuccess(response.data, postId))
            })
            .catch(err => {
                dispatch(addCommentFail(err.message))
            })
    }
}

//--------------Delete comment-----------------

export const deleteCommentSuccess = (postId, commentId) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        commentId: commentId,
        postId: postId
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
        axios.delete('comments/' + postId + '/' + commentId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(deleteCommentSuccess(postId, commentId))
            })
            .catch(err => {
                dispatch(deleteCommentFail(err.message))
            })
    }
}

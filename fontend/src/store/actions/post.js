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

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    }
}

export const fetchPosts = (token) => {
    return dispatch => {
        dispatch(fetchPostsStart())
            axios.get('posts', {headers: { "x-auth-token": token }})
            .then(response => {
                    dispatch(fetchPostsSuccess(response.data));
                    console.log(response.headers);
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
        post: post
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
                dispatch(addPostSuccess(response.data))
                console.log(response)
            })
            .catch(err => {
                dispatch(addPostFail(err))
            });
    }
}
import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsStart())
            axios.get('/posts')
            .then(res => {
                    dispatch(fetchPostsSuccess(res.data));
            })
            .catch(error => dispatch(fetchPostsFail(error)));
    }
}

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

export const deletePost = (postId) => {
    return dispatch => {
        axios.delete('posts/' + postId)
            .then(res => {
                dispatch(deletePostSuccess(postId))
                console.log(res);
            })
            .catch(err => dispatch(deletePostFail(err)));
    }
} 
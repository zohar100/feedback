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
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const fetchPostsStart = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        loading: false,
        error: null
    });
}

const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const deletePostSuccess = (state, action) => {
    const newPosts = state.posts.filter(post => post._id !== action.postId)
    return updateObject(state, {
        posts: newPosts
    })
}

const deletePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
    default:
        return state;
    } 
}

export default reducer;
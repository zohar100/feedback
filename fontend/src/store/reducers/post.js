import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    loading: false,
    error: null
}

//--------------Fetching posts-----------------
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

//--------------Delete post-----------------
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

//--------------Add post-----------------
const addPostSuccess = (state, action) => {
    return updateObject (state, {
        posts: state.posts.concat(action.post),
        error: null,
        loading: false
    })
}

const addPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

//--------------Add Comment-----------------

const addCommentStart = (state, action) => {
    return updateObject(state, {
        error: null
    })
}

const addCommentSuccess = (state, action) => {
    const newPosts = [];
    state.posts.map( post => {
            if(post._id === action.postId) {
                post.comments.push(action.comment)
                return newPosts.push(post);                       
            }
            else {
                return newPosts.push(post);
            }
        })
    console.log(newPosts);
    return updateObject (state, {
        loading: false,
        error: null,
        posts: newPosts
    })
}

const addCommentFail = (state, action) => {
    return updateObject (state, {
        loading: false,
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
        case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAIL: return addPostFail(state, action);
        case actionTypes.ADD_COMMENT_START: return addCommentStart(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
    default:
        return state;
    } 
}

export default reducer;
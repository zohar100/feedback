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

//--------------Delete Comment-----------------

const deleteCommentSuccess = (state, action) => {
    const newPosts = [];
    state.posts.map( post => {
            if(post._id === action.postId) {
                let commentIndex = post.comments.findIndex(comment => comment._id === action.commentId)
                post.comments.splice(commentIndex, 1)
                return newPosts.push(post);                       
            }
            else {
                return newPosts.push(post);
            }
        })
    return updateObject (state, {
        loading: false,
        error: null,
        posts: newPosts
    })
}

const deleteCommentFail = (state, action) => {
    return updateObject (state, {
        loading: false,
        error: action.error
    })
}

//--------------Likes-----------------
const toggleLikeSuccess = (state, action) => {
    const post = state.posts.filter(post => post._id === action.postId)
    console.log(post);
    const postLike = post[0].likes.find(like => like === action.userId)
    console.log(postLike);
    if(postLike){
        post[0].likes = post[0].likes.filter(like => like !== action.userId)
        console.log(post);
    }else{
        post[0].likes = post[0].likes.concat(action.userId)
        console.log(post[0]);
    }
    const posts = state.posts.filter(post => post._id !== action.postId).concat(post[0])
    console.log(posts);
 return updateObject(state, {
     error: null,
     posts: posts
 })
}

const toggleLikeFail = (state, action) => {
    updateObject(state, {
        error: action.error
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        //--------------Fetching posts-----------------
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        //--------------Delete post-----------------
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
        //--------------Add post-----------------
        case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAIL: return addPostFail(state, action);
        //--------------Add Comment-----------------
        case actionTypes.ADD_COMMENT_START: return addCommentStart(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
        //--------------Delete Comment-----------------
        case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state,action);
        case actionTypes.DELETE_COMMENT_FAIL: return deleteCommentFail(state, action);
        //--------------Likes-----------------
        case actionTypes.TOGGLE_LIKE_SUCCESS: return toggleLikeSuccess(state, action);
        case actionTypes.TOGGLE_LIKE_FAIL: return toggleLikeFail(state, action);
    default:
        return state;
    } 
}

export default reducer;
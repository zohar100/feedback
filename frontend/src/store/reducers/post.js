import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
    message: null
}

//--------------Fetching Posts-----------------
const fetchPostsStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null,
    });
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

//--------------Fetching Post-----------------
const fetchPostStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null,
    });
}

const fetchPostSuccess = (state, action) => {
    return updateObject(state, {
        post: action.post,
        error: null,
        loading: false
    })
}

const fetchPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


//--------------Add Post-----------------
const addPostSuccess = (state, action) => {
    return updateObject (state, {
        posts: state.posts.concat(action.post),
        message: action.message,
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

//--------------Delete Post-----------------
const deletePostSuccess = (state, action) => {
    const newPosts = state.posts.filter(post => post._id !== action.postId)
    return updateObject(state, {
        posts: newPosts,
        error: null,
    })
}

const deletePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

//--------------Likes-----------------
const toggleLikeSuccess = (state, action) => {
    const foundPost = state.posts.filter(post => post._id === action.postId)
    const postLike = foundPost[0].likes.find(like => like === action.userId)
    const posts =  state.posts.map(post =>{ 
        if(post._id === action.postId) {
            if(!postLike){
                return updateObject(post, {likes: post.likes.concat(action.userId)})
            }else{
                return updateObject(post, {likes: post.likes.filter(like => like !== action.userId)})
            }
        }else{
            return post;
        }
    })
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


const reducer = (state = initialState, action) => {
    switch(action.type) {
        //--------------Fetching Posts-----------------
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        //--------------Fetching Post-----------------
        case actionTypes.FETCH_POST_START: return fetchPostStart(state, action);
        case actionTypes.FETCH_POST_SUCCESS: return fetchPostSuccess(state, action);
        case actionTypes.FETCH_POST_FAIL: return fetchPostFail(state, action);
        //--------------Delete Post-----------------
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
        //--------------Add post-----------------
        case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state, action);
        case actionTypes.ADD_POST_FAIL: return addPostFail(state, action);
        //--------------Likes-----------------
        case actionTypes.TOGGLE_LIKE_SUCCESS: return toggleLikeSuccess(state, action);
        case actionTypes.TOGGLE_LIKE_FAIL: return toggleLikeFail(state, action);
        //--------------Add Comment-----------------
        case actionTypes.ADD_COMMENT_START: return addCommentStart(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
        //--------------Delete Comment-----------------
        case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state,action);
        case actionTypes.DELETE_COMMENT_FAIL: return deleteCommentFail(state, action);
        default:
        return state;
    } 
}

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    comments: [],
    loading: true,
    error: null
}

//--------------Fetch Comments-----------------
export const fetchCommentsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

export const fetchCommentsSuccess = (state, action) => {
    return updateObject(state, {
        comments: action.comments,
        loading: false,
        error: null
    });
}

export const fetchCommentsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


//--------------Add Comment-----------------

const addCommentStart = (state, action) => {
    return updateObject(state, {
        error: null
    })
}

const addCommentSuccess = (state, action) => {
    return updateObject (state, {
        loading: false,
        error: null,
        comments: state.comments.concat(action.comment)
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
    return updateObject (state, {
        loading: false,
        error: null,
        comments: state.comments.filter(comment => comment._id !== action.commentId)
    })
}

const deleteCommentFail = (state, action) => {
    return updateObject (state, {
        loading: false,
        error: action.error
    })
}

//--------------Clear comments-----------------

export const clearComments = (state, action) => {
    return updateObject(state, {
        comments: []
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        //--------------Fetch Comment-----------------
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        //--------------Add Comment-----------------
        case actionTypes.ADD_COMMENT_START: return addCommentStart(state, action);
        case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state, action);
        case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state, action);
        //--------------Delete Comment-----------------
        case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state,action);
        case actionTypes.DELETE_COMMENT_FAIL: return deleteCommentFail(state, action);
        //--------------Clear comments-----------------
        case actionTypes.CLEAR_COMMENTS: return clearComments(state, action)
    default: 
        return state;
    }
}

export default reducer;
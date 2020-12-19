import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    user:{
        id: null,
        username: null,
        email: null,
        posts: [],
        favorites: [],
        friends: []
    },
    error: null,
    loading: false
}

//--------------Fetching User-----------------
const fetchUserStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
}

const fetchUserSuccess = (state, action) => {
    const user = updateObject(state.user, {
        id: action.id,
        username: action.username,
        email: action.email,
        posts: action.posts,
        favorites: action.favorites,
        friends: action.friends
    })
    return updateObject(state, {
        user: user,
        loading: false,
        error: null
    })
}

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default:
            return state;
    }
}

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    fetchedUser:{
        id: null,
        username: null,
        profileImage: {
            url: null,
            filename: null
        },
        email: null,
        posts: [],
        favorites:[],
        followers: [],
        following: []
    },
    users: [],
    loading: false,
    error: null,
}

//--------------Fetching User-----------------
const fetchUserStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
}

const fetchUserSuccess = (state, action) => {
    const user = updateObject(state.fetchedUser, {
        id: action.id,
        username: action.username,
        profileImage: action.profileImage,
        email: action.email,
        posts: action.posts,
        favorites: action.favorites,
        following: action.following,
        followers: action.followers,
    })
    return updateObject(state, {
        fetchedUser: user,
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

//--------------Follow/Unfollow User-----------------
const followUserSuccess = (state, action) => {
    let fetchedUser = updateObject(state.fetchedUser, {
        followers: state.fetchedUser.followers.concat(action.currentUser)
    })
    state.fetchedUser.followers.map(post => {
        if(post._id === action.currentUser._id) {
            return fetchedUser = updateObject(state.fetchedUser, {
                followers: state.fetchedUser.followers.filter(post => post._id !== action.currentUser._id)
            })
        } return null;
    })
    return updateObject (state, {
        fetchedUser: fetchedUser,
        error: null
    })
}

const followUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

//--------------Search Users-----------------
const searchUsersStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
}

const searchUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users
    })
}

const searchUsersFail = (state, action) => {
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
        case actionTypes.FOLLOW_USER_SUCCESS: return followUserSuccess(state, action);
        case actionTypes.FOLLOW_USER_FAIL: return followUserFail(state, action);
        case actionTypes.SEARCH_USERS_START: return searchUsersStart(action, action);
        case actionTypes.SEARCH_USERS_SUCCESS: return searchUsersSuccess(action, action);
        case actionTypes.SEARCH_USERS_FAIL: return searchUsersFail(action, action);
        default:
            return state;
    }
}

export default reducer;
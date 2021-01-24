import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: localStorage.getItem('token'),
    user:{
        id: null,
        username: null,
        email: null,
        favorites:[],
        followers: [],
        following: []
    },
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
}

const authSuccess = (state, action) => {
    const user = updateObject(state.user, {
        id: action.id,
        username: action.username,
        email: action.email,
        favorites: action.favorites,
        followers: action.followers,
        following: action.following
    })
    return updateObject(state, {
        token: action.token,
        user: user,
        loading: false,
        error: null
    })
}


const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    const user = updateObject(state.user, {
        id: null,
        username: null,
        email: null,
        favorites: null,
        followers: null,
        following: null
    })
    return updateObject(state, {
        error: null,
        user: user,
        token: null
    })
}

//--------------Add post to favorite-----------------
const addToFavoriteSuccess = (state, action) => {
    let user = updateObject(state.user, {
        favorites: state.user.favorites.concat(action.post)
    });
    state.user.favorites.map(post => {
        if(post._id === action.post._id) {
            return user = updateObject(state.user, {
                favorites: state.user.favorites.filter(post => post._id !== action.post._id)
            })
        } return null;
    })
    return updateObject (state, {
        user: user,
        error: null
    })
}

const addToFavoriteFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.ADD_TO_FAVORITE_SUCCESS: return addToFavoriteSuccess(state, action);
        case actionTypes.ADD_TO_FAVORITE_FAIL: return addToFavoriteFail(state, action);
        default:
            return state;
    }
}

export default reducer;
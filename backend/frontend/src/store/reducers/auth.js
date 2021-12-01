import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: localStorage.getItem('token'),
    user:{
        id: null,
        username: null,
        profileImage: {
            url: null,
            filename: null
        }, 
        email: null,
        favorites:[],
        followers: [],
        following: [],
        notifications: []
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
        profileImage: action.profileImage,
        favorites: action.favorites,
        followers: action.followers,
        following: action.following,
        notifications: action.notifications
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
        profileImage: null,
        favorites: [],
        followers: [],
        following: [],
        notifications: []
    })
    return updateObject(state, {
        error: null,
        user: user,
        token: null
    })
}


//--------------Edit user-----------------
const editUserStart = (state, action) => {
    return updateObject(state, {
        loading: true, 
        error: null
    })
}

const editUserSuccess = (state, action) => {
    const user = updateObject(state.user, {
        username: action.username,
        email: action.email,
        profileImage: action.profileImage,
    })
    return updateObject(state, {
        token: action.token,
        user: user,
        loading: false,
        error: null
    })
}


const editUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
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
        //--------------Authenticate-----------------
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        //--------------Add To Favorites-----------------
        case actionTypes.ADD_TO_FAVORITE_SUCCESS: return addToFavoriteSuccess(state, action);
        case actionTypes.ADD_TO_FAVORITE_FAIL: return addToFavoriteFail(state, action);
        //--------------Edit User-----------------
        case actionTypes.EDIT_USER_START: return editUserStart(state, action);
        case actionTypes.EDIT_USER_SUCCESS: return editUserSuccess(state, action);
        case actionTypes.EDIT_USER_FAIL: return editUserFail(state, action);
        default:
            return state;
    }
}

export default reducer;
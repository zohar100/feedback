import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return { 
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (user,token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id: user.id,
        username: user.username,
        email: user.email,
        posts: user.posts,
        favorites: user.favorites,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRegister = (username, email, password ) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            email: email,
            username: username,
            password: password
        }

        axios.post('/register', userData)
            .then(response => {
                dispatch(authSuccess(response.data.user, response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
}

export const authLogin = (email,  password) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            email: email,
            password: password
        }

        axios.post('/login', userData)
            .then(response => {
                dispatch(authSuccess(response.data.user, response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.msg));
            });
    };
}

//--------------Add post to favorite-----------------
export const addToFavoriteSuccess = (post) => {
    return {
        type: actionTypes.ADD_TO_FAVORITE_SUCCESS,
        post: post,
    }
}

export const addToFavoriteFail = (err) => {
    return {
        type: actionTypes.ADD_TO_FAVORITE_FAIL,
        error: err
    }
} 

export const addToFavorite = (postId, token) => {
    return dispatch => {
        axios.post('posts/' + postId + '/favorite', null, {headers: { "x-auth-token": token }})
            .then(response => dispatch(addToFavoriteSuccess(response.data)))
            .catch(err => dispatch(addToFavoriteFail(err)));
    }
} 


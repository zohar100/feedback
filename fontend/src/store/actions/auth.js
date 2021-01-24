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
        followers: user.followers,
        following: user.following,
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

export const authLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                dispatch(authSuccess(response.data.user, response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.msg));
            });
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout());
        }else{
            axios.post('/tokenIsValid', null, {headers: { "x-auth-token": token }})
                .then(response => {
                    if(response.data !== false){
                        dispatch(authSuccess(response.data.user, response.data.token));
                    }else{
                        console.log('logout');
                        dispatch(authLogout);
                    }
                }).catch(error => {
                    console.log("error!!");
                    dispatch(authLogout());
                });
        }
    }
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
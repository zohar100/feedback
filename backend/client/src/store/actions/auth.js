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
        profileImage: user.profileImage,
        email: user.email,
        followers: user.followers,
        following: user.following,
        favorites: user.favorites,
        notifications: user.notifications,
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

export const authRegister = (user) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/register', user, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
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
                dispatch(authFail(error));
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
                        dispatch(authLogout);
                    }
                }).catch(error => {
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

export const addToFavorite = (token, postId, userId) => {
    return dispatch => {
        axios.post('users/' + userId + '/favorite', {postId: postId}, {headers: { "x-auth-token": token }})
            .then(response => dispatch(addToFavoriteSuccess(response.data)))
            .catch(err => dispatch(addToFavoriteFail(err)));
    }
} 

//--------------Edit user-----------------

export const editUserStart = () => {
    return { 
        type: actionTypes.EDIT_USER_START
    }
}

export const editUserSuccess = (user) => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
        username: user.username,
        profileImage: user.profileImage,
        email: user.email,
    }
}

export const editUserFail = (error) => {
    return {
        type: actionTypes.EDIT_USER_FAIL,
        error: error
    }
}

export const editUser = (userId, userData, token) => {
    return dispatch => {
        dispatch(editUserStart());
        axios.put('/users/' + userId, userData, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(editUserSuccess(response.data.user));
            })
            .catch(error => {
                dispatch(editUserFail(error.response.data.msg));
            });
    };
}
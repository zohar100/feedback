import axios from '../../axios';

import * as actionTypes from './actionTypes';


//--------------Fetching User-----------------
export const fetchUserStart = () => {
    return { 
        type: actionTypes.FETCH_USER_START
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        id: user._id,
        username: user.username,
        email: user.email,
        posts: user.posts,
        favorites: user.favorites,
        friends: user.friends
    }
}

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
}

export const fetchUser = (userId, token) => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('user/' + userId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUserFail(error.response.data.msg));
            });
    };
}


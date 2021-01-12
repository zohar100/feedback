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
        favorites: user.favorites,
        posts: user.posts,
        followers: user.followers,
        following: user.following
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

//--------------Follow/unfollow user-----------------
export const followUserSuccess = (currentUser) => {
    return {
        type: actionTypes.FOLLOW_USER_SUCCESS,
        currentUser: currentUser
    }
}


export const followUserFail = (err) => {
    return {
        type: actionTypes.FOLLOW_USER_FAIL,
        error: err
    }
}

export const followUser = (userId, token) => {
    return dispatch => {
        axios.post('/follow/' + userId, null, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(followUserSuccess(response.data.currentUser))
                console.log(response);
            })
            .catch(err => {
                dispatch(followUserFail(err))
                console.log(err)
            });
    }
}

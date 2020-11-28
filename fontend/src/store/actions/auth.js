import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return { 
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: localId
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

export const auth = (username, password, isSignup ) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            username: username,
            password: password
        }
        let url = null;
        !isSignup ? url = '/login' : url = '/register';

        axios.post(url, userData)
            .then(response => {
                dispatch(authSuccess(response.data.localId));
                console.log(response.headers);
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
}
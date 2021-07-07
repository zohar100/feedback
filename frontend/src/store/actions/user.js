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
        id: user.id,
        username: user.username,
        profileImage: user.profileImage,
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
        axios.get('/users/' + userId, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(fetchUserSuccess(response.data.user));
            })
            .catch(error => {
                dispatch(fetchUserFail(error.response.data));
            });
    };
}

//--------------Follow/Unfollow User-----------------
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
        axios.post('/users/'+ userId + '/follow', null, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(followUserSuccess(response.data.currentUser))
            })
            .catch(err => {
                dispatch(followUserFail(err))
            });
    }
}

//--------------Search Users-----------------
export const searchUsersStart = () => {
    return {
        type: actionTypes.SEARCH_USERS_START
    }
}
export const searchUsersSuccess = (users) => {
    return {
        type: actionTypes.SEARCH_USERS_SUCCESS,
        users: users
    }
}
export const searchUsersFail = (err) => {
    return {
        type: actionTypes.SEARCH_USERS_FAIL,
        error: err
    }
}

// export const searchUsers = (token, searchValue, searchRef) => {
//     return dispatch => {
//         if(searchValue=== searchRef){
//             dispatch(searchUsersStart())
//             const query = 
//             searchValue ? searchValue.length === 0 ? 
//             '' : `?username=${searchValue}` : '';
//             axios.get('/users' + query, {headers: { "x-auth-token": token }})
//             .then((response)=> {
//                 dispatch(searchUsersSuccess(response.data))
//             }).catch(err=> dispatch(searchUsersFail(err)))
//           }  
//     }
// }

export const searchUsers = (token, searchValue) => {
    return dispatch => {
        dispatch(searchUsersStart())
        const query = 
        searchValue ? searchValue.length === 0 ? 
        '' : `?username=${searchValue}` : '';
        axios.get('/users' + query, {headers: { "x-auth-token": token }})
            .then((response)=> {
                dispatch(searchUsersSuccess(response.data))
            }).catch(err=> dispatch(searchUsersFail(err)))
    }
}
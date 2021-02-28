import axios from '../../axios';

import * as actionTypes from './actionTypes';


//--------------Fetch User's Chats-----------------
export const fetchChatsStart = () => {
    return {
        type: actionTypes.FETCH_CHATS_START
     }
}

export const fetchChatsSuccess = (chats) => {
    return {
        type: actionTypes.FETCH_CHATS_SUCCESS,
        chats: chats
     }
}

export const fetchChatsFail = (error) => {
    return {
        type: actionTypes.FETCH_CHATS_FAIL,
        error: error
     }
}

export const fetchChats = (userId, token) => {
    return dispatch => {
        axios.get('http://127.0.0.1:5000/chats?id=' + userId , {headers: { "x-auth-token": token }})
        .then(response => {
            dispatch(fetchChatsSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchChatsFail(error));
        })
    }
}


//--------------Fetch Spasific Chat-----------------
export const fetchChatStart = () => {
    return {
        type: actionTypes.FETCH_CHAT_START
     }
}

export const fetchChatSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_CHAT_SUCCESS,
        chat: chat
     }
}

export const fetchChatFail = (error) => {
    return {
        type: actionTypes.FETCH_CHAT_FAIL,
        error: error
     }
}

export const fetchChat = (chatId, token) => {
    return dispatch => {
        axios.get('http://127.0.0.1:5000/chats/' + chatId , {headers: { "x-auth-token": token }})
        .then(response => {
            dispatch(fetchChatSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchChatFail(error));
        })
    }
}
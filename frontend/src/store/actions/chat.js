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
        axios.get('/chats?id=' + userId , {headers: { "x-auth-token": token }})
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
        axios.get('/chats/' + chatId , {headers: { "x-auth-token": token }})
        .then(response => {
            dispatch(fetchChatSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchChatFail(error));
        })
    }
}

//--------------Add Chat-----------------

export const addChatSuccess = (chat) => {
    return{
        type: actionTypes.REMOVE_MESSAGE,
        chat: chat
    }
}

export const addChatFail = (msgId) => {
    return{
        type: actionTypes.ADD_CHAT_FAIL
    }
}

export const addChat = (chatId, token) => {
    return dispatch => {
        axios.post('/chats/' + chatId, {headers: { "x-auth-token": token }})
        .then(response => {
            dispatch(addChatSuccess(response.data));
        }).catch((error) => {
            dispatch(addChatFail(error));
        });
    }
}
//--------------Add/Remove Message-----------------
export const addMessage = (msg) => {
    return{
        type: actionTypes.ADD_MESSAGE,
        message: msg,
    }
}

export const removeMessage = (msgId) => {
    return{
        type: actionTypes.REMOVE_MESSAGE,
        messageId: msgId,
        error: null
    }
}

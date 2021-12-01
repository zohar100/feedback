import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    chats: [],
    chat: {
        id: null,
        users: [],
        messages: [],
    },
    error: null,
    loading: false
}

//--------------Fetch User's Chats-----------------
const fetchChatsStart = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}

const fetchChatsSuccess = (state, action) => {
    return updateObject(state, {
        chats: action.chats,
        loading: false,
        error: null
    })
}

const fetchChatsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

//--------------Fetch Spasific Chat-----------------
const fetchChatStart = (state, action) => {
    return updateObject(state, {loading: true, error: null});
}

const fetchChatSuccess = (state, action) => {
    const chat = updateObject(state.chat, {
        id: action.chat._id,
        users: action.chat.users,
        messages: action.chat.messages,
    })
    return updateObject(state, {
        chat: chat,
        loading: false,
        error: null
    })
}

const fetchChatFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

//--------------Add Chat-----------------
export const addChatSuccess = (state, action) => {
    updateObject(state, {
        chats: state.chats.concat(action.chat)
    })
}

export const addChatFail = (msgId) => {
    return{
        type: actionTypes.ADD_CHAT_FAIL
    }
}

//--------------Add/Remove message-----------------
const addMessage = (state, action) => {
    const updatedChat = updateObject(state.chat, {
        messages: state.chat.messages.concat(action.message),
    });
    return updateObject(state, {
        chat: updatedChat,
        error: null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        //--------------Fetch User's Chats-----------------
        case actionTypes.FETCH_CHATS_START: return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS: return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAIL: return fetchChatsFail(state, action);
        //--------------Fetch Spasific Chat-----------------
        case actionTypes.FETCH_CHAT_START: return fetchChatStart(state, action);
        case actionTypes.FETCH_CHAT_SUCCESS: return fetchChatSuccess(state, action);
        case actionTypes.FETCH_CHAT_FAIL: return fetchChatFail(state, action);
        //--------------Add/Remove message-----------------
        case actionTypes.ADD_MESSAGE: return addMessage(state, action);
    default: 
        return state;
    }
}

export default reducer;
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
    return updateObject(state, {
        chat: action.chat,
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
    default: 
        return state;
    }
}

export default reducer;
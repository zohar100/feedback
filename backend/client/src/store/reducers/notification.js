import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    notifications: [],
    error: null,
    loading: false
}

//--------------Fetch User's Notifications-----------------
const fetchNotificationsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const fetchNotificationsSuccess = (state, action) => {
    return updateObject(state, {
        notifications: action.notifications,
        error: null,
        loading: false
    });
}

const fetchNotificationsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

//--------------Delete Notifications-----------------------
const deleteNotificationSuccess = (state, action) => {
    return updateObject(state, {
        notifications: state.notifications.filter(notification => notification._id !== action.notificationId),
        loading: false,
        error: null
    });
}

const deleteNotificationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        //--------------Fetch User's Notifications-----------------
        case actionTypes.FETCH_NOTIFICATIONS_START: return fetchNotificationsStart(state, action);
        case actionTypes.FETCH_NOTIFICATIONS_SUCCESS: return fetchNotificationsSuccess(state, action);
        case actionTypes.FETCH_NOTIFICATIONS_FAIL: return fetchNotificationsFail(state, action);
        //--------------Delete Notifications-----------------------
        case actionTypes.DELETE_NOTIFICATION_SUCCESS: return deleteNotificationSuccess(state, action);
        case actionTypes.DELETE_NOTIFICATION_FAIL: return deleteNotificationFail(state, action);
    default: 
        return state;
    }
}

export default reducer;
import axios from '../../axios';

import * as actionTypes from './actionTypes';


//--------------Fetch User's Notification-----------------
export const fetchNotificationsStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_START
     }
}

export const fetchNotificationsSuccess = (notifications) => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        notifications: notifications
     }
}

export const fetchNotificationsFail = (error) => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
        error: error
     }
}

export const fetchNotifications = (userId, token) => {
    return dispatch => {
        axios.get('/notification?id=' + userId , {headers: { "x-auth-token": token }})
        .then(response => {
            dispatch(fetchNotificationsSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchNotificationsFail(error));
        })
    }
}

//--------------Delete Notification-----------------

export const deleteNotificationSuccess = (msg, notificationId) => {
    return {
        type: actionTypes.DELETE_NOTIFICATION_SUCCESS,
        message: msg,
        notificationId: notificationId
    }
}

export const deleteNotificationFail = (error) => {
    return {
        type: actionTypes.DELETE_NOTIFICATION_FAIL,
        error: error
    }
}

export const deleteNotification = (id, token) => {
    return dispatch => {
        axios.delete('notification/' + id, {headers: { "x-auth-token": token }})
            .then(response => {
                dispatch(deleteNotificationSuccess(response.data.message, id))
            })
            .catch(err => dispatch(deleteNotificationFail(err)));
    }
}
const types = {
    CHAT_MESSAGE: 'CHAT_MESSAGE',
    POST_LIKE: 'POST_LIKE',
    POST_COMMENT: 'POST_COMMENT',
    USER_FOLLOW: 'USER_FOLLOW'
}

const notificationsBuilder = (type, fromUsername, navigateId, imageUrl) => {
    switch(type){
        case types.CHAT_MESSAGE: 
            return {
                kind: types.CHAT_MESSAGE,
                text: 'New Message from ' + fromUsername,
                navigationId: navigateId,
                imageUrl: imageUrl
            }
        case types.POST_LIKE: 
            return {
                kind: types.POST_LIKE,
                text: fromUsername + ' liked your post',
                navigationId: navigateId,
                imageUrl: imageUrl
            }
        case types.POST_COMMENT: 
            return {
                kind: types.POST_COMMENT,
                text: fromUsername + ' wrote a comment on your post',
                navigationId: navigateId,
                imageUrl: imageUrl
            }
        case types.USER_FOLLOW: 
            return {
                kind: types.USER_FOLLOW,
                text: fromUsername + ' started to follow you',
                navigationId: navigateId,
                imageUrl: imageUrl
            }
    }
}

module.exports = {types, notificationsBuilder}
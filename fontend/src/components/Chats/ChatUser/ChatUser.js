import React from 'react';

import classes from './ChatUser.module.css';
import ProfileImage from '../../ProfileImage/ProfileImage';

const ChatUser = ({ imageUrl, username, clicked}) => {

    return(
        <div className={classes.ChatUser} onClick={clicked}>
            <ProfileImage imageUrl={imageUrl}/>
            <span>{username}</span>
        </div>
    )
}

export default ChatUser;
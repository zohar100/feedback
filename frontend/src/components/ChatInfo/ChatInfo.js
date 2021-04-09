import React from 'react';

import classes from './ChatInfo.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

const ChatInfo = ({username}) => {
    return(
    <div className={classes.ChatInfo}>
        <ProfileImage/>
        <h3>{username}</h3>
    </div>
    )
}

export default ChatInfo;
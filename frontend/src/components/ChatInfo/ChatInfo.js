import React from 'react';

import classes from './ChatInfo.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';

const ChatInfo = ({username, profileImage}) => {
    return(
    <div className={classes.ChatInfo}>
        <ProfileImage
        imageUrl={profileImage}/>
        <h3>{username}</h3>
    </div>
    )
}

export default ChatInfo;
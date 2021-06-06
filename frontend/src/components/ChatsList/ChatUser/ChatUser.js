import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ChatUser.module.css';
import ProfileImage from '../../ProfileImage/ProfileImage';

const ChatUser = ({ imageUrl, username, clicked, chatId}) => {

    return(
        <Link to={'/chats/' + chatId}>
            <div className={classes.ChatUser}>
                <ProfileImage imageUrl={imageUrl}/>
                <span>{username}</span>
            </div>
        </Link>
    )
}

export default ChatUser;
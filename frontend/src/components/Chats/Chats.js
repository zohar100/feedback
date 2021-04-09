import React from 'react';

import classes from './Chats.module.css';
import ChatUser from './ChatUser/ChatUser';

const SideBar = ({chats, user, chatClicked}) => {

    return(
        <div className={classes.SideBar}>
          <h3>Chat</h3>
          {chats.map(chat => (
            <>
                <ChatUser 
                key={chat._id}
                username={chat.users[0]._id === user.id ? chat.users[1].username : chat.users[0].username}
                imageUrl={chat.users[0]._id === user.id ? chat.users[1].profileImage.url : chat.users[0].profileImage.url}
                clicked={() => chatClicked(chat._id)}
                />
            </>
          ))}
        </div>
    )
}

export default SideBar;
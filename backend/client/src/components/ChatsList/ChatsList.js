import React from 'react';

import ChatUser from './ChatUser/ChatUser';
import ChatToolbar from './ChatToolbar/ChatToolbar'
import classes from './ChatsList.module.css';

const ChatsList = ({chats, user, chatClicked}) => {
    return(
        <div className={classes.SideBar}>
          <ChatToolbar/>
          {chats.map(chat => (
                <ChatUser 
                key={chat._id}
                username={chat.users[0]._id === user.id ? chat.users[1].username : chat.users[0].username}
                imageUrl={chat.users[0]._id === user.id ? chat.users[1].profileImage.url : chat.users[0].profileImage.url}
                chatId={chat._id}
                clicked={() => chatClicked(chat._id)}
                />
          ))}
        </div>
    )
}

export default ChatsList;
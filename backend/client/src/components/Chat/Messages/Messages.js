import React from 'react';
import Message from './Message/Message';

import classes from './Messages.module.css';

const Messages = ({messages, currentUserId}) => {
    let showMessages = <p>No messages to this chat.</p>
    if(messages){
        showMessages = (
            messages.map(msg => (
                <Message
                key={msg._id}
                text={msg.text}
                name={msg.user.username}
                currentUser={msg.user._id === currentUserId}
                />
            ))
        )
    }
    return (<div className={classes.Messages}>{showMessages}</div>);
}

export default Messages;
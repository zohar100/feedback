import React from 'react';

import classes from './Chat.module.css';
import Message from '../../Messages/Message/Message';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import ProfileImage from '../../ProfileImage/ProfileImage'; 

import SendIcon from '@material-ui/icons/Send';

const Chat = ({formValue, formChange, handleSubmit, messages, currentUserId}) => {

   return(
            <div className={classes.Chat}>
                <div className={classes.UserInfo}>
                    <ProfileImage/>
                    <h3>username</h3>
                </div>
                <div className={classes.Messages}>
                    {messages.map(msg => (
                        <Message
                        key={msg._id}
                        text={msg.text}
                        name={msg.user.username}
                        currentUser={msg.user._id === currentUserId}/>
                    ))}
                </div>
                <div className={classes.Form}>
                    <form>   
                        <Input
                        elementType='input' 
                        elementConfig={{type: 'text', placeholder: 'Send message...', name: 'text'}}
                        value={formValue || ''}
                        changed={formChange}/>
                        <Button clicked={handleSubmit}><SendIcon/></Button>
                    </form>
                </div>
            </div>
   )
}

export default Chat;
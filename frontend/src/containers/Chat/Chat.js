import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Chat.module.css';
import ChatInfo from '../../components/ChatInfo/ChatInfo'; 
import Messages from '../../components/Messages/Messages';
import ChatForm from '../../components/ChatForm/ChatForm';
import Modal from '../../components/UI/Modal/Modal';
import useForm from '../../utilities/useForm';
import useWebSockets from '../../utilities/useWebSockets';
import * as actions from '../../store/actions/index';


const Chat = (props) => {
    const dispatch = useDispatch();
    const {token, user} = useSelector(state => state.auth);
    const chat = useSelector(state => state.chat.chat)
    const [showChat, setShowChat] = useState(false);

    const {deleteChat, addMessage} = actions;

    const { join, send } = useWebSockets({
        token: token,
        enabled: token ? true: false,
        addMessage: addMessage
    })

    const submitHandler = () => {
        send(formValue.text, chat.id)
      }
  
    const [formValue, setInputValue, handleSubmit] = useForm(null, null, submitHandler);

    useEffect(() => {
        if(chat.id !== null) setShowChat(true);
    }, [chat])

    useEffect(() => {
        if(chat.id !== null) {
            join(chat.id);
        }
    }, [chat, join])

    const modalClickedHandler = () => {
        setShowChat(false)
        dispatch(deleteChat())
    }

    let username;
    let profileImage;
    if(chat.id){
        username = chat.users[0]._id === user.id ? chat.users[1].username : chat.users[0].username;
        profileImage=chat.users[0]._id === user.id ? chat.users[1].profileImage.url : chat.users[0].profileImage.url;
    }

   return(
       
       <Modal show={showChat} modalClosed={() => modalClickedHandler()}>
            <ChatInfo
            username={username}
            profileImage={profileImage}/>
            <div className={classes.Messages}>
                <Messages
                messages={chat.messages}
                currentUserId={user.id}/>
            </div>
            <ChatForm
            formValue={formValue.text}
            formChange={setInputValue}
            handleSubmit={handleSubmit}
            />
       </Modal>
   )
};

export default Chat;
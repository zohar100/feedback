import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './Chat.module.css';
import ChatInfo from '../../components/ChatInfo/ChatInfo'; 
import Messages from '../../components/Messages/Messages';
import ChatForm from '../../components/ChatForm/ChatForm';
import useForm from '../../utilities/useForm';
import useWebSockets from '../../utilities/useWebSockets';
import * as actions from '../../store/actions/index';


const Chat = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {token, user} = useSelector(state => state.auth);
    const chat = useSelector(state => state.chat.chat)
    const { addMessage, fetchChat} = actions;

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
        loadData();
    })

    const loadData = () => {
        if(params.id){
            if(!chat.id || (chat.id !== params.id)){
                dispatch(fetchChat(params.id, token));
            }
        }
    }

    useEffect(() => {
        if(chat.id !== null) {
            join(chat.id);
        }
    }, [chat, join])

    let username;
    let profileImage;
    if(chat.id){
        username = chat.users[0]._id === user.id ? chat.users[1].username : chat.users[0].username;
        profileImage=chat.users[0]._id === user.id ? chat.users[1].profileImage.url : chat.users[0].profileImage.url;
    }

   return(
       <>
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
        </>
   )
};

export default Chat;
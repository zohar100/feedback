import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Chat.module.css';
import ChatInfo from '../../components/ChatInfo/ChatInfo'; 
import Messages from '../../components/Messages/Messages';
import ChatForm from '../../components/ChatForm/ChatForm';
import Modal from '../../components/UI/Modal/Modal';
import useForm from '../../utilities/useForm';
import useWebSockets from '../../utilities/useWebSockets';
import * as actions from '../../store/actions/index';


const Chat = (props) => {
    const [showChat, setShowChat] = useState(false);

    const {chat, token} = props;

    const { send, messages } = useWebSockets({
        token: token,
        enabled: token ? true: false
    })

    const submitHandler = () => {
        // ref.current.emit('inputMessage', ({chatId: chat.id, message:formValue.text}), () => {
        //     console.log('onEmitMessage');
        // });
        send(formValue.text, chat.id)
      }
  
      const [formValue, setInputValue, handleSubmit] = useForm(null, null, submitHandler);

    useEffect(() => {
        if(chat.id !== null) setShowChat(true)
    }, [chat])

    const modalClickedHandler = () => {
        setShowChat(false)
        props.onDeleteChat()
    }

    // useEffect(() => {
//   if(ref.current)
//   ref.current.on('outputMessage', (message) => {
//       console.log('recivingChatdata')
//       actions.addMessage(message)
//   })
//   console.log(chat.messages);
// }, [chat.messages, ref]);

   return(
       <Modal show={showChat} modalClosed={() => modalClickedHandler()}>
            <ChatInfo
            username={'username'}/>
            <div className={classes.Messages}>
                <Messages
                messages={messages}
                currentUserId={props.user.id}/>
            </div>
            <ChatForm
            formValue={formValue.text}
            formChange={setInputValue}
            handleSubmit={handleSubmit}
            />
       </Modal>
   )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        chat: state.chat.chat,
        socket: state.chat.socket,
        token: state.auth.token,
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onFetchChat: (chatId, token) => dispatch(actions.fetchChat(chatId, token)),
        onDeleteChat: () => dispatch(actions.deleteChat())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
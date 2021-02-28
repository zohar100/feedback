import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import classes from './Chats.module.css';
import ChatUser from './ChatUser/ChatUser';
import Chat from './Chat/Chat';
import Modal from '../UI/Modal/Modal';
import useForm from '../../utilities/useForm';
import * as actions from '../../store/actions/index';

const SideBar = (props) => {
    const [chats, setChats] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const submitHandler = (chatId) => {
      socket.emit('Input Message', ({chatId: showModal, message:FormValue.text}), () => {});
    }

    const [FormValue, setInputValue, handleSubmit] = useForm(null, null, submitHandler);
    
    const { token, user } = props;
  
    const setupSocket = () => {
      if (token && !socket) {
        const newSocket = io('http://localhost:5000', {
          query: {
            token: token,
          },
        });
  
        newSocket.on("disconnect", () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
        });
  
        newSocket.on("connect", () => {
        });
  
        setSocket(newSocket);
      }
    };
  
    useEffect(() => {
      setupSocket();
    }, [token]);

    useEffect(() => {
      if(socket && showModal !== null){
        axios.get('http://127.0.0.1:5000/chats/' + showModal, {headers: { "x-auth-token": token }})
        .then(response => {
          console.log(response);
          if(response.data.messages)
          setMessages(response.data.messages);
        })
        socket.emit('Join', {chatId: showModal});
      }else{
        setMessages([]);
      }
    }, [showModal, socket]);

    useEffect(() => {
      if(socket){
      socket.on('outputMessage', (message) => {
        setMessages([...messages, message])
      })
      console.log(messages);
    }
    }, [messages, socket, token]);

    useEffect(() => {
      //all user`s chats
      if(token && user.id){
        axios.get('http://127.0.0.1:5000/chats?id=' + user.id , {headers: { "x-auth-token": token }})
        .then(response => {
          console.log(response.data);
          setChats(response.data);
          if(response.data.messages)
          setMessages(response.data.messages);
        })
      }
    }, [token, user]);

    const showModalHandler = (chatId) => {
      setShowModal(prevState => {
          if(prevState === chatId) {
              return null;
          }
          return chatId;
      });
  }



    return(
        <div className={classes.SideBar}>
          <h3>Chat</h3>
          {chats.map(chat => (
            <>
                <ChatUser 
                key={chat._id}
                username={chat.users[0]._id === user.id ? chat.users[1].username : chat.users[0].username}
                imageUrl={chat.users[0]._id === user.id ? chat.users[1].profileImage.url : chat.users[0].profileImage.url}
                clicked={() => showModalHandler(chat._id)}
                />
                <Modal show={showModal === chat._id ? true: false} modalClosed={() => setShowModal(null)}>
                  <Chat
                  key={chat._id + 'chat'}
                  formValue={FormValue.text}
                  formChange={setInputValue}
                  handleSubmit={handleSubmit}
                  messages={messages}
                  currentUserId={props.user.id}
                  />
                </Modal>
            </>
          ))}
        </div>
    )
}

const mapStateToProps = state => {
  return {
      user: state.auth.user,
      token: state.auth.token
  }
} 

const mapDispatchToProps = dispatch => {
  return {
      onAuthLogout: () => dispatch(actions.authLogout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
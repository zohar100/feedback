import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';


const useWebSockets = ({token, enabled, onConnected}) => {
  const ref = useRef();
  const [messages, setMessages] = useState([]);

  const send = (msg, chatId) => {
    ref.current.emit('inputMessage', ({chatId: chatId, message:msg}), () => {
      console.log('onEmitMessage');
  });
  };

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const socket = io('http://localhost:5000', {
        query: {
          token: token,
        },
      });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('outputMessage', (message) => {
      console.log('hello');
      setMessages((prev) => prev.concat(message))
  });

    socket.on('connect', () => {
      if (onConnected) {
        onConnected();
      }
    });

    ref.current = socket;

    return () => socket.disconnect();
  }, [enabled, token, onConnected]);

  return {
    send,
    messages
  };
};



export default useWebSockets;
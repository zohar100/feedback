import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';


const useWebSockets = ({token, enabled, addMessage, onConnected}) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const join = (chatId) => {
    ref.current.emit('join', ({chatId: chatId}), () => {
  });
  };

  const send = (msg, chatId) => {
    ref.current.emit('inputMessage', ({chatId: chatId, message:msg}), () => {
      console.log('onEmitMessage');
  });
  };

  useEffect(() => {

    if (!enabled) {
      return;
    }

    const socket = io('http://localhost:8080', {
        query: {
          token: token,
        },
      });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('outputMessage', (message) => {
      dispatch(addMessage(message))
  });

    socket.on('connect', () => {
      if (onConnected) {
        onConnected();
      }
    });

    ref.current = socket;

    return () => socket.disconnect();
  }, [enabled, token, onConnected, addMessage, dispatch]);

  return {
    join,
    send
  };
};



export default useWebSockets;
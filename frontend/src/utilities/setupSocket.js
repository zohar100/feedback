import io from 'socket.io-client';

const setupSocket = (token, socket, callback) => {
    if (token && !socket) {
      const newSocket = io('http://localhost:5000', {
        query: {
          token: token,
        },
      });

      newSocket.on("disconnect", () => {
        callback(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connect", () => {
      });
      console.log('========SetupSocket========', newSocket);
      callback(newSocket);
    }
  };


  export default setupSocket;
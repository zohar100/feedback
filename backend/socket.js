module.exports = io => {
    // middleware
//     io.use((socket, next) => {
//     let clientId = socket.handshake.headers['x-clientid'];
//     if (clientId) {
//       console.log(clientId);
//     }
//     return next(new Error('authentication error'));
//   });

    io.on("connection", function (socket) {
        socket.on('join', ({name, room}, callback) => {
            console.log({name, room});
    
            const { error, user } = addUser(socket.id, name, room );
    
            if(error) return callback(error);
    
            socket.emit('message', { user: 'admin',  text: `${user.name}, welcome to the room ${user.room}`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text:`${user.name}, has joined!` });
    
            socket.join(user.room);
    
            io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)})
    
            callback()
        });
    })
  }
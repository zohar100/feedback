const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');

module.exports = async (io) => {
    io.on("connection",  (socket) => {
        let token = socket.handshake.query.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if(error){
                    throw new ServerError(error);
                }else{
                    io.decoded = decoded;
                }
            });
        }
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
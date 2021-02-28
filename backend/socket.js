const jwt = require('jsonwebtoken');
const ServerError = require('./utility/ServerError');
const Chat = require('./models/chat.model');
const Message = require('./models/message.model');


module.exports = async (io) => {
    io.use(async (socket, next) => {
        try {
          const token = socket.handshake.query.token;
          const payload = await jwt.verify(token, process.env.JWT_SECRET);
          socket.userId = payload.id;
          next();
        } catch (err) {}
    });

    io.on('connection',  (socket) => {
        console.log('Connected: ' + socket.userId)
    
    socket.on('Join', async (data) => {
    try{
        const foundChat = await Chat.findById(data.chatId);  
        // console.log(foundChat);
        socket.join(data.chatId); 
    }catch(error) {
        console.error(error)
    }  
    })

    socket.on('Input Message', async (data) => {
        // data required chatId and message
        try {  
            const chat = await Chat.findById(data.chatId);
            const newMessage = await new Message({user: socket.userId, text: data.message})
            chat.messages.push(newMessage._id)
            await chat.save();
            await newMessage.save().then((result) => {
                Message.populate(newMessage, {path: 'user'})
                .then(comment => {
                    console.log(newMessage);
                    io.sockets.in(data.chatId).emit('outputMessage', comment);     
                })
            });
        }catch(error) {
            console.error(error)
        }
    });   

        socket.on('disconnect', () => {
            console.log('User had left');
        });
    })
  }
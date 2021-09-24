const Chat = require('../models/chat.model');
const catchAsync = require('../utility/catchAsync');


//-----------All Chats/ Chats With Spacific Users-----------//
module.exports.index = catchAsync(async (req, res) => {
    // find Chat that the user.id inside the users object is equal to decoded.id 
    if(req.query.id) {
        const queryChats = await Chat.find({ users: req.query.id }).populate('users').populate('messages');
        return res.json(queryChats);
    }else{
        const chats = await Chat.find({}).populate('users');
        return res.json(chats);
    }
});

//-----------Spacific Chat-----------//
module.exports.showChat = catchAsync(async (req, res) => {
    console.log();
    const chat = await Chat.findById(req.params.chatId)
            .populate('users')
            .populate({
                    path: 'messages', 
                    populate: 'user'
            });
    res.json(chat);
});

//-----------Create Chat-----------//
module.exports.newChat = catchAsync(async (req, res) => {
    const newChat = {
        users: [req.user, req.params.userId]
    }
    const chat = await new Chat(newChat)
    console.log(chat);
    await chat.save();
    res.json(chat);
});

//-----------delete Chat-----------//
module.exports.deleteChat = catchAsync(async (req, res) => {
    const chat = await Chat.findById(req.params.chatId);
    if(!chat.users.length === 0){
        const newChat = await chat.users.filter(user => !user.equals(req.user));
        await newChat.save();
    }else {
        await Chat.findByIdAndDelete(req.params.chatId);
    }
    res.json({message: 'success'});
});
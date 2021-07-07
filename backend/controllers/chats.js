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
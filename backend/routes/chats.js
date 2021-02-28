const router = require("express").Router();
const Chat = require('../models/chat.model');
const isLoggedIn  = require("../middlewares/middleware");


router.get('/', isLoggedIn, async (req, res) => {
    try{
        // find Chat that the user.id inside the users object is equal to decoded.id 
        // console.log(chats);
        if(req.query.id) {
            const queryChats = await Chat.find({ users: req.query.id }).populate('users').populate('messages');
            return res.json(queryChats);
        }else{
            const chats = await Chat.find({}).populate('users');
            return res.json(chats);
        }
    }catch(err) {
        res.status(400).json('Cannot find chats!')
    }
})

router.get('/:chatId', isLoggedIn, async (req, res) => {
    try{
        console.log();
        const chat = await Chat.findById(req.params.chatId).populate('users').populate({path: 'messages', populate: 'user'});
        console.log(chat);
        res.json(chat);
    }catch(err) {
        res.status(400).json('Cannot find chat!')
    }
})

module.exports = router;
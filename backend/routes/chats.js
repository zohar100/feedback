const router = require("express").Router();
const chats = require('../controllers/chats');
const isLoggedIn  = require("../middlewares/middleware");

//get all chats
router.get('/', isLoggedIn, chats.index);

//get spacific chat
router.get('/:chatId', isLoggedIn, chats.showChat);

//create new chat
router.post('/:userId', isLoggedIn, chats.newChat);

//delete chat
router.delete('/:chatId', isLoggedIn, chats.deleteChat);

module.exports = router;
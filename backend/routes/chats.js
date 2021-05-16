const router = require("express").Router();
const chats = require('../controllers/chats');
const isLoggedIn  = require("../middlewares/middleware");

//get all chats
router.get('/', isLoggedIn, chats.index)

//get spacific chat
router.get('/:chatId', isLoggedIn, chats.showChat)

module.exports = router;
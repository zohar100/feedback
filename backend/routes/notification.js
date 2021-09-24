const router = require("express").Router();
const notifications = require('../controllers/notifications')
const isLoggedIn  = require("../middlewares/middleware");


//get all notifications
// router.get("/", isLoggedIn, notifications.index);

//add notification
router.post("/", isLoggedIn, notifications.newNotification);


//delete notification
router.delete("/:id", isLoggedIn, notifications.deleteNotification);




module.exports = router;
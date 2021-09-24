const Notification = require('../models/notification.model');
const User = require("../models/user.model");
const { notificationsBuilder } = require('../utility/notificationsBuilder'); 
const catchAsync = require('../utility/catchAsync');

module.exports.index = catchAsync(async (req, res) => {
    
});

module.exports.newNotification = async (userIdToSent, triggerUserId, type, id) => {
    const userToSent = await User.findById(userIdToSent)
    const triggerUser = await User.findById(triggerUserId)
    if(!userToSent._id.equals(triggerUserId)){
        const notification = await new Notification(notificationsBuilder(type, triggerUser.username, id, triggerUser.profileImage.url))
        await userToSent.notifications.push(notification._id)
        await notification.save()
        await userToSent.save()
    }
};

module.exports.deleteNotification = catchAsync(async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({message: "Notification deleted!"});
});

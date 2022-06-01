const Notification = require("../models/notification.model");

//add notification
exports.addNotification = (req, res) => {
    const notification = new Notification({
        title: req.body.title,
        message: req.body.message,
        status: req.body.status,
        user: req.body.user
    });
    notification.save((err, notification) => {
        if (err) {
        res.json({
            success: false,
            msg: "Failed to add notification"
        });
        } else {
        res.json({
            success: true,
            msg: "Notification added",
            notification: notification
        });
        }
    });
    }


//get all notifications
exports.getAllNotifications = (req, res) => {
    Notification.find({}, (err, notifications) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to get notifications"
            });
        } else {
            res.json({
                success: true,
                msg: "Notifications retrieved",
                notifications: notifications
            });
        }
    });
}

//get notification by userid
exports.getNotificationByUserId = (req, res) => {
    Notification.find({user: req.params.userId}, (err, notifications) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to get notifications"
            });
        } else {
            res.json({
                success: true,
                msg: "Notifications retrieved",
                notifications: notifications
            });
        }
    });
}

//push notification
exports.pushNotification = (req, res) => {
    Notification.findByIdAndUpdate(req.params.notificationId, {$set:{status: true}}, (err, notification) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to push notification"
            });
        } else {
            res.json({
                success: true,
                msg: "Notification pushed",
                notification: notification
            });
        }
    });
}


//push notification by userid
exports.pushNotificationByUserId = (req, res) => {
    Notification.find({user: req.params.userId, status: false}, (err, notifications) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to get notifications"
            });
        } else {
            res.json({
                success: true,
                msg: "Notifications retrieved",
                notifications: notifications
            });
        }
    });
}

//delete notification
exports.deleteNotification = (req, res) => {
    Notification.findByIdAndRemove(req.params.notificationId, (err, notification) => {
        if (err) {
            res.json({
                success: false,
                msg: "Failed to delete notification"
            });
        } else {
            res.json({
                success: true,
                msg: "Notification deleted",
                notification: notification
            });
        }
    });
}


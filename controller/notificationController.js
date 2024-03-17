// controllers/notificationController.js

const Notification = require('../models/notification');

// Retrieve notifications for a user
async function getUserNotifications(req, res) {
    try {
        const notifications = await Notification.find({ from: req.params.userId });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Mark notification as read
async function markNotificationAsRead(req, res) {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.notificationId, { status: 'read' }, { new: true });
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        res.json(notification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getUserNotifications,
    markNotificationAsRead
};

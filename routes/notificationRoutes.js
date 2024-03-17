const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

// Retrieve notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Mark notification as read
router.put('/:notificationId', notificationController.markNotificationAsRead);

module.exports = router;

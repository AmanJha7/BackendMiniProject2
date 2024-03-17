const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

router.get('/:userId', notificationController.getUserNotifications);

router.put('/:notificationId', notificationController.markNotificationAsRead);

module.exports = router;

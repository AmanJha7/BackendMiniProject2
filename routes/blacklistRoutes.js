const express = require('express');
const router = express.Router();
const blacklistController = require('../controller/blacklistController');

// Add user to blacklist
router.post('/', blacklistController.addUserToBlacklist);

// Remove user from blacklist
router.delete('/:userId', blacklistController.removeUserFromBlacklist);

module.exports = router;

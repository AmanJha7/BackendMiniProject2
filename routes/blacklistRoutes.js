const express = require('express');
const router = express.Router();
const blacklistController = require('../controller/blacklistController');

router.post('/', blacklistController.addUserToBlacklist);

router.delete('/:userId', blacklistController.removeUserFromBlacklist);

module.exports = router;

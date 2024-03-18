const express = require('express');
const router = express.Router();
const confessController = require('../controller/confessController');

router.post('/', confessController.addConfess);

module.exports = router;

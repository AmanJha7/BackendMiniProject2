// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Routes for CRUD operations
router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;

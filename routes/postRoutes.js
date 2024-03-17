const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// Create a new post
router.post('/', postController.createPost);

// Retrieve a post by ID
router.get('/:postId', postController.getPostById);

// Update a post by ID
router.put('/:postId', postController.updatePostById);

// Delete a post by ID
router.delete('/:postId', postController.deletePostById);

module.exports = router;

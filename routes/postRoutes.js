const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');


router.post('/', postController.createPost);

router.get('/:postId', postController.getPostById);

router.put('/:postId', postController.updatePostById);

router.delete('/:postId', postController.deletePostById);

module.exports = router;

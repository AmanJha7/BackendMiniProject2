// controllers/postController.js

const Post = require('../models/post');

// Create a new post
async function createPost(req, res) {
    const { from, time, comments, visibility, likes } = req.body;

    try {
        // Create new post instance
        const post = new Post({
            from,
            time,
            comments,
            visibility,
            likes
        });

        // Save post to the database
        await post.save();

        res.json({ msg: 'Post created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Retrieve a post by ID
async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Update a post by ID
async function updatePostById(req, res) {
    const { from, time, comments, visibility, likes } = req.body;

    try {
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update post fields
        post.from = from;
        post.time = time;
        post.comments = comments;
        post.visibility = visibility;
        post.likes = likes;

        await post.save();

        res.json({ msg: 'Post updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Delete a post by ID
async function deletePostById(req, res) {
    try {
        await Post.findByIdAndRemove(req.params.postId);
        res.json({ msg: 'Post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    createPost,
    getPostById,
    updatePostById,
    deletePostById
};

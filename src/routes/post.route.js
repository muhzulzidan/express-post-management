// post.route.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');

const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/post.controller');


// Get a specific post
router.get('/:postID', getPost);
// Get all posts
router.get('/', getAllPosts);
// Create a new post
router.post('/', verifyToken, createPost);
// Update a post
router.put('/:postID', verifyToken, updatePost);
// Delete a post
router.delete('/:postID', verifyToken, deletePost);


module.exports = router;

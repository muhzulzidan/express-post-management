// post.route.js
const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/post.controller');
const { verifyToken } = require('../middlewares/verifyToken');
// Create a new post
router.post('/', verifyToken, createPost);

module.exports = router;

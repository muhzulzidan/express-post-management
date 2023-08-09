const { postNew } = require('../models');

// Create a new post
const createPost = async (req, res) => {
    try {
        // Get the user ID from the req.user object (added by the verifyToken middleware)
        const { id: user_id } = req.user;

        const { title, body } = req.body;

        if (!user_id || !title || !body) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        const newPost = await postNew.create({ user_id, title, body });

        return res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error occurred', error });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await postNew.findAll();
        return res.status(200).send(allPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error occurred', error });
    }
};

const getPost = async (req, res) => {
    try {
        const { postID } = req.params;
        const post = await postNew.findOne({ where: { id: postID } });

        if (!post) {
            return res.status(404).send({ message: 'Post not found.' });
        }

        return res.status(200).send(post);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error occurred', error });
    }
};


const updatePost = async (req, res) => {
    try {
        const { id: user_id } = req.user;
        const { postID } = req.params;
        const { title, body } = req.body;

        if (!user_id || !title || !body) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        const updatedPost = await postNew.update(
            { title, body },
            { where: { id: postID, user_id } }
        );

        if (updatedPost[0] === 0) {
            return res.status(404).send({ message: 'Post not found or unauthorized.' });
        }

        return res.status(200).send({ message: 'Post updated successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error occurred', error });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id: user_id } = req.user;
        const { postID } = req.params;

        const deletedRowsCount = await postNew.destroy({
            where: { id: postID, user_id }
        });

        if (deletedRowsCount === 0) {
            return res.status(404).send({ message: 'Post not found or unauthorized.' });
        }

        return res.status(200).send({ message: 'Post deleted successfully.' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error occurred', error });
    }
};



module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };



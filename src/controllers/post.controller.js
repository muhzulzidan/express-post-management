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

module.exports = { createPost };

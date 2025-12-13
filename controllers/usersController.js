const bcrypt = require('bcrypt');
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
    const {username, name, password} = request.body;
    const saltRounds = 10;
    const passwordHash  = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        username,
        name,
        passwordHash 
    });
    try {
        const savedUser = await newUser.save();
        response.status(200).json(savedUser);
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate key error (unique constraint violation)
            return response.status(400).json({ error: 'username must be unique' });
        }
        throw error; // Re-throw other errors to be handled by error middleware
    }
});

module.exports = usersRouter;

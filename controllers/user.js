const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (!(name && username && password))
    return response.status(400).json({ error: "some field is missing" });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    username,
    passwordHash
  };
  
  const user = new User(newUser); 
  const result = await user.save();

  return response.status(201).json(result);
});

module.exports = userRouter;

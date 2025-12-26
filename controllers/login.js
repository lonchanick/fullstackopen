const jwt = require("jsonwebtoken");
const User = require("../models/user");
const loginRoute = require("express").Router();
const bcrypt = require("bcrypt");

loginRoute.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

  if (!(passwordCorrect && user))
    return response.status(401).json({ error: "wrong password or username" });

  const userForToken = {
    username: user.username,
    id: user._id
  }
  
  const token = jwt.sign(userForToken,process.env.SECRET);

  response.status(200).send({token, username: username, name: user.name})

});

module.exports = loginRoute;

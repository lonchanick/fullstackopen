const bcrypt = require("bcrypt");
const User = require("../models/user");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const helper = require("./test_helper");

const api = supertest(app);

describe("When there is initialy one user in DB", async () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const newUser = new User({ username: "root", passwordHash });
    await newUser.save();
  });

  test("Creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Cabezon",
      name: "Agustin",
      password: "asdasd",
    };

    const responseFromMongo = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // console.log('>>> Response from mongo:\n',responseFromMongo.text);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
    const usernameList = usersAtEnd.map((u) => u.username);
    assert(usernameList.includes(newUser.username));
    // console.log("Last username: ", usernameList[usernameList.length - 1]);
  });

  test("Creation fails when username is alreay taken.", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root", // Try to create duplicate of the user created in beforeEach
      name: "Lalo",
      password: "asdasd123",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    
    const usersAtend = await helper.usersInDb();
    // console.log(result.body.error);
    assert.strictEqual(usersAtStart.length, usersAtend.length); // No new user should be created
  });
});

after(async () => {
  await mongoose.connection.close();
});

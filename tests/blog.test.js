const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("node:assert");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("Blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all Blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("verifies that the unique identifier property of the blog posts is named id", async () => {
  const blogsResponse = await api.get("/api/blogs");
  const blogs = blogsResponse.body;
  assert.strictEqual(
    blogs[0].hasOwnProperty("id"),
    true,
    "It has the property id"
  );
});

test("verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  const newBlogForTesting = {
    title: "Blog for testing",
    author: "Idk",
    url: "www.code.ec",
    likes: 22,
  };

  const currentAmountOfBlogs = (await api.get('/api/blogs')).body.length;

  const savingNewBlogForTesting = await api.post("/api/blogs")
  .send(newBlogForTesting)
  .expect(201);

  const AfterCurrentAmountOfBlogs = (await api.get('/api/blogs')).body.length;

  console.log('current amount of blogs: ', currentAmountOfBlogs);
  console.log('after amount of blogs: ', AfterCurrentAmountOfBlogs);

  const listOfBlogsAfterSaving = (await api.get('/api/blogs')).body.map(b => b.title);
  console.log(listOfBlogsAfterSaving);

  assert.strictEqual(currentAmountOfBlogs+1, AfterCurrentAmountOfBlogs);
  assert.strictEqual(listOfBlogsAfterSaving.includes("Blog for testing"), true);
});
 

after(async () => {
  await mongoose.connection.close();
});

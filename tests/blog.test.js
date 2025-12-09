const { test, after, beforeEach, describe } = require("node:test");
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

describe('First part test:', async ()=>{
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

  // console.log('\tcurrent amount of blogs: ', currentAmountOfBlogs);
  // console.log('\tafter amount of blogs: ', AfterCurrentAmountOfBlogs);

  const listOfBlogsAfterSaving = (await api.get('/api/blogs')).body.map(b => b.title);
  // console.log(listOfBlogsAfterSaving);

  assert.strictEqual(currentAmountOfBlogs+1, AfterCurrentAmountOfBlogs);
  assert.strictEqual(listOfBlogsAfterSaving.includes("Blog for testing"), true);
});
})
 
describe("DELETE: /blogs/:id", async ()=>{
  test('Succeeds with a valid ID', async ()=>{
    const blogsAtStart = await helper.currentBlogsInDb();
    const firstBlogOfTheList = blogsAtStart[0];
    await api.delete(`/api/blogs/${firstBlogOfTheList.id}`)
    .expect(204);

    const blogsAtEnd = await helper.currentBlogsInDb();
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length+1);
  })
})

describe("UPDATE: /blogs/:id", async ()=>{
  test('Succeeds with a valid ID', async ()=>{
    const blogsAtStart = await helper.currentBlogsInDb();
    const firstBlogOfTheList = blogsAtStart[0];
    
    const updatedBlog = await api.put(`/api/blogs/${firstBlogOfTheList.id}`)
    .send({likes: 3141516})
    .expect(200);

    const blogsAtEnd = await helper.currentBlogsInDb();
    const firstBlogOfTheListBefore = blogsAtEnd[0];

    console.log('Blog likes before: ',firstBlogOfTheList.likes);
    console.log('Blof likes after: ',firstBlogOfTheListBefore.likes);
    
    const validation = (firstBlogOfTheListBefore.likes === 3141516 
    && (firstBlogOfTheList.likes != firstBlogOfTheListBefore.likes)) ? true : false;

    assert(validation);
  })
})


after(async () => {
  await mongoose.connection.close();
});

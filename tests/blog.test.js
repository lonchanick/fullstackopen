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

  console.log(newBlogForTesting);

  const currentAmountOfBlogs = (await api.get('/api/blogs')).body.length;

  const savingNewBlogForTesting = await api.post("/api/blogs")
  .send(newBlogForTesting)
  .expect(201);

  const AfterCurrentAmountOfBlogs = (await api.get('/api/blogs')).body.length;

  console.log('current amount of blogs', currentAmountOfBlogs);
  console.log('after amount of blogs', AfterCurrentAmountOfBlogs);

  const listOfBlogsAfterSaving = (await api.get('/api/blogs')).body.map(b => b.title);
  console.log(listOfBlogsAfterSaving);

  assert.strictEqual(currentAmountOfBlogs+1, AfterCurrentAmountOfBlogs);
  assert.strictEqual(listOfBlogsAfterSaving.includes("Blog for testing"), true);
});

// test("a specific note is within the returned notes", async () => {
//   const response = await api.get("/api/notes");

//   const contents = response.body.map((e) => e.content);
//   assert.strictEqual(contents.includes("HTML is easy"), true);
// });

// //test for POST new note
// test("A valid note can be added!", async () => {
//   const newNote = {
//     content: "async await, simplifies making async calls",
//     important: true,
//   };
//   await api
//     .post("/api/notes")
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const notesAtEnd  = await helper.notesInDb();
//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

//   const contents = notesAtEnd.map(note => note.content);
//   assert(contents.includes("async await, simplifies making async calls"));
// });

// //test for: an empty note can not be added to db
// test("An empty note can not be added!", async () => {
//   const newNote = {
//     important: true,
//   };

//   await api
//     .post("/api/notes")
//     .send(newNote)
//     .expect(400)

//   const notesAtend = await helper.notesInDb();
//   assert.strictEqual(notesAtend.length, helper.initialNotes.length);

// });

// //test for: an empty note can not be added to db
// test("a specific note can be viewed!!", async () => {
//   const noteAtStart = await helper.notesInDb();
//   const noteToView = noteAtStart[0];

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   assert.deepStrictEqual(resultNote.body, noteToView);

// });

after(async () => {
  await mongoose.connection.close();
});

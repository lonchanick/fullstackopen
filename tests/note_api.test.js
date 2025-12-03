const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");
const assert = require("node:assert");
const helper = require('./test_helper');

const api = supertest(app); 

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//aqui los test que no usan supertest library

//test for all notes are returned
test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});
//*****************************************************

//test for POST new note
test("A valid note can be added!", async () => {
  const newNote = {
    content: "async await, simplifies making async calls",
    important: true,
  };
  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const notesAtEnd  = await helper.notesInDb();
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

  const contents = notesAtEnd.map(note => note.content);
  assert(contents.includes("async await, simplifies making async calls"));
});

//test for: an empty note can not be added to db
test("An empty note can not be added!", async () => {
  const newNote = {
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(400)
  
  const notesAtend = await helper.notesInDb();
  assert.strictEqual(notesAtend.length, helper.initialNotes.length);

});

//test for: an empty note can not be added to db
test("a specific note can be viewed!!", async () => {
  const noteAtStart = await helper.notesInDb();
  const noteToView = noteAtStart[0];
  
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  assert.deepStrictEqual(resultNote.body, noteToView);

});



after(async () => {
  await mongoose.connection.close();
});

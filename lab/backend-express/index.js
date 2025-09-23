require('dotenv').config();
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const Note = require('./models/note')
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
 
 

//get all notes
app.get("/api/notes", (req, resp) => {
  Note.find({}).then((result) => {
    console.log("Mongo Results:\n",result);
    resp.json(result); 
  }); 
});

//get note by id
app.get("/api/notes/:id", (request, resp) => {
  // const id = request.params.id;
  // Note.find({_id:id})
  
  const id = req.params.id;
  const note = notes.find((n) => n.id === id);

  if (note) return resp.status(200).json(note);

  return resp.status(404).json({ response: "Element not found" });
});

//set new note
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if(!body) return response.status(400).json({"error":"missing body"});
  const newNote = new Note( {content: body.content, important: body.important || false});
  
});

//delete note
app.delete("/api/notes/:id", (req, resp) => {
  const id = req.params.id;

  if (!id) return resp.status(400).json({ response: "Bad request dude!" });
  const el = notes.find((n) => n.id === id);

  if (!el) return resp.status(404).json({ response: "resource Not found" });

  notes = notes.filter((n) => n.id !== id);
  return resp.status(200).json(notes);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend for note sterted on port ${PORT}!`);
});

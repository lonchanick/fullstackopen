require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

//get all notes
app.get("/api/notes", (req, resp) => {
  Note.find({}).then((result) => {
    resp.json(result);
  });
});

//get note by id
app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) return response.json(note);
      else
        return response.status(400).json({ error: "Note id does not exist!" });
    })
    .catch((err) => {
      next(err);
      // console.log("Something went wrong");
      // response.json({error: "Something went wrong DUDE", details: err});
    });
});

//set new note
app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  // if(!body) return response.status(400).json({"error":"missing body"});
  const newNote = new Note({
    content: body.content,
    important: body.important || false,
  });
  newNote.save().then(response => {
    return response.status(200).json(newNote);
  }).catch((err) => next(err, response));
  
});

//delete note
app.delete("/api/notes/:id", (req, resp, next) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((response) => {
      return resp.status(200).end();
    })
    .catch(err);
  {
    next(err);
  }
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) return response.status(404).end();

      note.content = content;
      note.important = important;

      note.save().then((updatedNote) => {
        return response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error("ERROR DETAILS:\n", error.message);
  if (error.name === "CastError")
  {
    return response.status(400).json({ error: "malformatted Id" });
  }else if(error.name === "ValidationError")
  {
    return response.status(400).json({error: error.message})
  }

  next(error);
};

//Note that the error-handling middleware has to be the last loaded middleware, also all the routes
// should be registered before the error-handler!
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend for note sterted on port ${PORT}!`);
});

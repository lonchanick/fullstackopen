const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const getTokenFrom = (request)=>{
  const authorization = request.get('authorization');
  if(authorization && authorization.startsWith('Bearer '))
    return authorization.replace('Bearer ','');
}

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate('user',{username:1, name: 1});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const noteResponse = await Note.findById(request.params.id);
  if (noteResponse) {
    response.status(200).json(noteResponse);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;
  const isolatedToken = getTokenFrom(request);
  const decodedToken = jwt.verify(isolatedToken, process.env.SECRET);

  if(!decodedToken.id)
    return response.status(401).json({error: 'Token invalid'})

  //decodedToken.id es el id del usuario porque cuando se creo el token
  //la informacin que se uso fue el id y username:
  /*he validity of the token is checked with jwt.verify. The 
  method also decodes the token, or returns the Object which the 
  token was based on. */ 
  const user = await User.findById(decodedToken.id);

  if(!user) return response.status(400).json({error: 'userId missing or not valid'});

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  });

  const newCreatedNote = await note.save();
  user.notes = user.notes.concat(newCreatedNote.id);
  // if(currentNotes = user.notes)
  // {
  //   user.notes = user.notes.concat(newCreatedNote.id);
  // }else{
  //   user.notes = newCreatedNote.id;
  // }
  await user.save();

  response.status(201).json(newCreatedNote);
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let notes = [
    {
      "id": "f505",
      "content": "Diego Arroyo",
      "important": false
    },
    {
      "id": "903a",
      "content": "Dayana Intriago",
      "important": true
    },
    {
      "id": "e33a",
      "content": "Agustin Arroyo",
      "important": true
    }
  ]

  //get all notes
app.get('/api/notes', (req, resp)=>{
    console.log('current notes:',notes);
    resp.status(200).json(notes);
})

//get note by id
app.get('/api/notes/:id',(req,resp)=>{
    const id = req.params.id;
    const note = notes.find(n => n.id === id);
    
    if(note) return resp.status(200).json(note);

    return resp.status(404).json({response:'Element not found'});
})

//set new note
app.post('/api/notes',(req, resp)=>{
    const newNote = req.body;
    newNote.id = (notes.length + 1).toString();
    notes = notes.concat(newNote);
    console.log('current notes:',notes);
    resp.status(200).json(notes);
})

//delete note
app.delete('/api/notes/:id', (req,resp)=>{
    const id = req.params.id;

    if(!id) return resp.status(400).json({'response':'Bad request dude!'}) 
    const el = notes.find(n => n.id === id); 

    if(!el) return resp.status(404).json({response: "resource Not found"});

    notes = notes.filter(n => n.id !== id);
    return resp.status(200).json(notes);
})


const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Backend for note sterted on port ${PORT}!`);
})
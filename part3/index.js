const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy -XXXXXX",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
/********************/
/*NOTES APP REQUEST*/
/********************/
//GET HOME PAGE
app.get('/', (reques,response)=> response.send('<h1>home</h1>'))

//GET ALL NOTES
app.get('/api/notes',(request,response)=> response.json(notes));

//GET NOTE BY ID
app.get('/api/notes/:id', (request, response)=>{
  const id = request.params.id;
  const obj = notes.find(el => el.id === id);
  if(obj)
    response.json(obj);

  response.status(404).end();
})

//DELETE NOTE BY ID
app.delete('/api/notes/:id', (request, response)=>{ 
  const id = request.params.id;
  notes = notes.filter(n => n.id !== id);
  // response.json(notes_filtered);
  response.json(notes);
})

//CREATE NEW NOTE
const createId = ()=>{
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0;

  const totalId = String(maxId + 1);

  return totalId;
}

app.post('/api/notes', (req, resp)=>{
  
  const body = req.body
  if(!body.content)
    return resp.status(400).json({"error": "Content missing"})

  const newNote = {
    id: createId(),
    content: body.content,
    important: body.important || false
  } 

  console.log('New note to add:',newNote);
  notes = notes.concat(newNote);
  resp.json(notes);

})


const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();

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

app.get('/', (reques,response)=> response.send('<h1>home</h1>'))
app.get('/notes',(request,response)=> response.json(notes));
app.get('/notes/:id', (request, response)=>{
  const id = request.params.id;
  const obj = notes.find(el => el.id === id);
  if(obj)
    response.json(obj);

  response.status(404).end();
})


const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});

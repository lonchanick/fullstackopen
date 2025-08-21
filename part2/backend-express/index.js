const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

morgan.token('req-body', (req) =>  req.method === 'POST' ? JSON.stringify(req.body) : ''); 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//home page
app.get("/api", (request, response) => {
  response.json({ "Home content": "This is the Home Page" });
});

//get persons
app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

//get info
app.get("/api/info", (request, response) => {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long", // e.g., Saturday
    year: "numeric",
    month: "long", // e.g., August
    day: "numeric",
  });
  const info = `${formatted} --- Phone Book has info for ${persons.length} people.`;
  response.status(200).json(info);
});

//get person by id: if id is null then response will be 404: not found
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  
  if (person)  return response.status(200).json(person); 

  return response.status(404).json({ error: "wrong ID/not found" });
});

//exercise 3.4: Implement functionality that makes it possible to delete a single phonebook entry 
// by making an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);
    return response.status(200).json(persons);
})

//exercise 3.5
app.post('/api/persons',(request, response)=>{
    const id = Math.floor(Math.random()* 999);
    
    const el = request.body.id 
    ? {...request.body}
    : {...request.body, id: id.toString()}

    if(!el.name || !el.number)
      return response.status(400).json({"error:":"Missing required fields: name and number are required"})

    if(persons.find(p => p.id === el.id))
      return response.status(400).json({"error:":"Id already exist"})

    persons.push(el);
    response.status(200).json({"server says: ":"New object added", "object":el})
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

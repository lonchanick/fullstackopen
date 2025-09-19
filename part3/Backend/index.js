const express = require("express");
const morgan = require("morgan");
const phonebook = require("./Models/phonebook");

const app = express();
app.use(express.json());

morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

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
  response.send("<h1>Home Page</h1>");
});
//***********************CURRENT*******************************/
//get request to create a new record, working.
// app.get('/api/createAll', (request, response)=>{
//   const family = [
//     {name: "Dayana Intriago", number: "0000000001"},
//     {name: "Diego Arroyo", number: "0000000002"},
//     {name: "Agustin Arroyo", number: "0000000003"}]

//   // const newPhonebook = new Phonebook(family);
//   Phonebook.insertMany(family)
//   .then(()=>{
//     response.json({response: "Mocking data"});
//   });
// });
//***********************CURRENT*******************************/

//get persons
app.get("/api/contacts", (request, response) => {
  phonebook.find({}).then((contacts) => {
    response.json(contacts);
  });
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

  const contactsLength = phonebook.find({}).then((contacts) => {
    const info = `${formatted} --- Phone Book has info for ${contacts.length} people.`;
    response.status(200).json(info);
  });
});

app.get("/api/contact/:id", (request, response) => {
  const id2 = request.params.id;
  phonebook.findById(id2)
  .then(contact =>{
    response.json(contact)
  })
 
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend for note sterted on port ${PORT}!`);
});

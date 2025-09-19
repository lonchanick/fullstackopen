const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const phonebook = require("./Models/phonebook");
const { default: phone } = require("../myapp/src/services/phone");

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("req-body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

//home page
app.get("/api", (request, response) => {
  response.send("<h1>Contact API Interface - Home Page</h1>");
}); 

//get contact
app.get("/api/contacts", (request, response) => {
  phonebook.find({}).then((contacts) => {
    response.json(contacts);
  });
});

//get contact by id
app.get("/api/contact/:id", (request, response) => {
  const id2 = request.params.id;
  phonebook.findById(id2)
  .then(contact =>{
    response.json(contact)
  })
 
});

//create new contact in mongodb
app.post('/api/contacts',(request, response)=>{
  const body = request.body;
  if(!body) return response.status(400).json({"error":"missing body"});
  const newContact = new phonebook( {name: body.name, number: body.number});

  newContact.save()
  .then(result => {
    console.log(result);
    response.json(result);
  });
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend for note sterted on port ${PORT}!`);
});

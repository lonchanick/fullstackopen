const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const phonebook = require("./Models/phonebook");

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
app.get("/api/contact", (request, response) => {
  phonebook.find({}).then((contacts) => {
    response.json(contacts);
  });
});

//get contact by id
app.get("/api/contact/:id", (request, response) => {
  const id2 = request.params.id;
  phonebook.findById(id2).then((contact) => {
    response.json(contact);
  });
});

//create new contact in mongodb
app.post("/api/contact", (request, response, next) => {
  const body = request.body;
  // if(!body) return response.status(400).json({"error":"missing body"});
  const newContact = new phonebook({ name: body.name, number: body.number });

  newContact
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error, request);
    });
});

//delete contact
app.delete("/api/contact/:id", (request, response, next) => {
  const id = request.params.id;
  phonebook
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result)
        return response
          .status(404)
          .json({ "my_error_message: ": "something went wrong dude!" });
      else return response.status(200).json(result);
    })
    .catch((error) => next(error));
});

//update contact
// app.put('/api/contact/:id',(request,response)=>{
// phonebook.updateOne(request.params.id, request.params.body)
// return response.status(200).json({"message: ": "still working dude, be patient.."});
// });

app.put("/api/contact/:id", (request, response) => {
  const { id } = request.params;
  const updateData = request.body;

  // Update the contact
  const updatedContact = phonebook
    .findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on update
      }
    )
    .catch((err) => next(err));

  // Check if contact exists
  if (!updatedContact) {
    return response.status(404).json({
      error: "Contact not found",
    });
  }

  response.status(200).json({
    success: true,
    data: updatedContact,
  });
});

const errorHandler = (error, request, response, next) => {
  console.error("error dude: \n", error.name," : ", error.message);
  // if(error.name === 'CastError') return response.status(400).send({error: "malformated id"});
  if (error.name === "ValidationError") {
    return response.status(400).json({ errorDude: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend for note sterted on port ${PORT}!`);
});

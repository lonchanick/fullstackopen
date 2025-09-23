const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false); 
const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Succefull connection!");
  })
  .catch((err) => {
    console.log("Something went wrong", err.message);
  });

  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
  });

  noteSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
  }) 
  module.exports = mongoose.model('Note',noteSchema);




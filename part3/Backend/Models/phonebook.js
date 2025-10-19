const mongoose = require("mongoose");
require("dotenv").config();

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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{5,}$/.test(value);
      },
      message:
        "Invalid phone number format. Must be like 09-1234556 or 040-22334455.",
    },
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("phonebook", noteSchema);

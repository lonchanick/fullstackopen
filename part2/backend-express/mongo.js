const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
  //no hace falta return, la linea anterior termina la ejecucion
}

const password = process.argv[2];
const collectionName = "person";
const url = `mongodb+srv://Lonchanick:${password}@fullstackopen.okvdrf9.mongodb.net/${collectionName}?retryWrites=true&w=majority&appName=fullstackOpen`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phone Book:");
    result.forEach((p) => console.log(p));
    mongoose.connection.close();
  });

  return;
}

const person = new Person({
  name: process.argv[3].toString(), //name and..
  phone: process.argv[4].toString(), //phone number
});

person.save().then((result) => {
  console.log(`Added: ${person}`);
  mongoose.connection.close();
});

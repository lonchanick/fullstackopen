const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // create id field
    delete returnedObject._id; // remove _id
    delete returnedObject.__v; // remove __v (optional but clean)
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

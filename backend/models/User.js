const mongoose = require("mongoose");

const UserSchema = {
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    unique: true,
    enum: ["Librarian", "Student"],
    required: true,
  },
};

const User = new mongoose.model("User", UserSchema);

module.exports = User;

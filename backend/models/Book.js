const mongoose = require("mongoose");

const BookSchema = {
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["FYCS", "SYCS", "TYCS", "FYIT", "SYIT", "TYIT"],
    required: true,
  },
};

const Book = new mongoose.model("Book", BookSchema);

module.exports = Book;

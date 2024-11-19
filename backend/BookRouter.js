const express = require("express");
const Book = require("./models/Book");
const isLibrarian = require("./helper");
const User = require("./models/User");
const authMiddleware = require("./middleWare/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong while fetching books data",
        error: error.message,
      });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ message: " Invalid Book ID !" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong while fetching books data",
        error: error.message,
      });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.profession === "Librarian") {
      const book = new Book(req.body);
      await book.save();
      res.status(200).json({ message: "Book Added Successfully.", book: book });
    } else {
      return res
        .status(404)
        .json({ message: "You are not authorized user to access this API." });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Something went wrong while adding book data.",
        error: error.message,
      });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.profession === "Librarian") {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!book) {
        return res.status(400).json({ message: "BOOK NOT FOUND" });
      }
      res.status(200).json(book);
    } else {
      return res
        .status(404)
        .json({ message: "You are not authorized user to access this API." });
    }
  } catch (error) {
    return res.status(500).json({ message:"Something went wrong while updating the data.",error:error.message });
  }
});

router.delete('/:id',authMiddleware,async(req,res)=>{
  try{
    if (req.user.profession === "Librarian") {
      const book = await Book.findByIdAndDelete(req.params.id);

      if (!book) {
        return res.status(400).json({ message: "BOOK NOT FOUND" });
      }
      res.status(200).json(book);
    } else {
      return res
        .status(404)
        .json({ message: "You are not authorized user to access this API." });
    }
  }catch(error){

    return res.status(500).json({ message: error.message });
  }
})

module.exports = router;
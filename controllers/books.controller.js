const { books, getNextAutoId, incrementNextAutoId } = require("../models/books.models");

function addBook(req, res) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Missing book title" });
  }

  const { title } = req.body;
  const author = req.body.author ? req.body.author : "N/A";

  const newBook = {
    id: getNextAutoId(),
    title,
    author,
  };

  books.push(newBook);
  incrementNextAutoId();

  res.json(newBook);
}

module.exports = {
    addBook,
}
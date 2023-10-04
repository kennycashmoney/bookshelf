const {
  books,
  getNextAutoId,
  incrementNextAutoId,
} = require("../models/books.models");

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

function getBooks(_req, res) {
  res.json(books);
}

function getBook(req, res) {
  const bookId = Number(req.params.id);
  const book = books[bookId];

  if (!book) {
    return res.status(404).json({ error: "book not found..." });
  }

  res.json(book);
}

function updateBook(req, res) {
  const bookId = Number(req.params.id);
  const book = books[bookId];

  if (!book) {
    return res.status(404).json({ error: "book not found..." });
  }

  const { title } = req.body;
  if (!title) {
    return res
      .status(202)
      .json({ error: "No Content. Need to include a title..." });
  }

  book.title = title;
  book.author = req.body.author ? req.body.author : "N/A";

  res.json(book);
}

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
};

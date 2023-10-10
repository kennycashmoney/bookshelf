const express = require("express");

const {
  postBook,
  getBooks,
  getBook,
  putBook,
  deleteBook,
} = require("./books.controller");

const booksRouter = express.Router();

booksRouter.post("/", postBook);

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBook);

booksRouter.put("/", (_req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);
booksRouter.put("/:id", putBook);

booksRouter.delete("/", (_req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);
booksRouter.delete("/:id", deleteBook);

module.exports = booksRouter;

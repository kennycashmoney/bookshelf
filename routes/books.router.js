const express = require("express");

const {addBook, getBooks, getBook} = require("../controllers/books.controller");

const booksRouter = express.Router();

//C
booksRouter.post("/", addBook);
//R
booksRouter.get('/', getBooks);
booksRouter.get('/:id', getBook);
//U
//D

module.exports = booksRouter;
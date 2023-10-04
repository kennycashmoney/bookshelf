const express = require("express");

const {addBook, getBooks, getBook, updateBook} = require("../controllers/books.controller");

const booksRouter = express.Router();

//C
booksRouter.post("/", addBook);
//R
booksRouter.get('/', getBooks);
booksRouter.get('/:id', getBook);
//U
booksRouter.put('/', (_req, res) => res.status(405).json({error: 'Method Not Allowed'}));
booksRouter.put('/:id', updateBook);
//D

module.exports = booksRouter;
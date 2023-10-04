const express = require("express");

const {addBook} = require("../controllers/books.controller");

const booksRouter = express.Router();

//C
booksRouter.post("/", addBook);
//R
//U
//D

module.exports = booksRouter;
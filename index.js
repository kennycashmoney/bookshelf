const express = require("express");

const books = require("./models/books.models");

const app = express();
const PORT = 3000;

app.get("/books", (req, res) => {
  res.send(books);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

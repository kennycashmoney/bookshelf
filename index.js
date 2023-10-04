const express = require("express");

const booksRouter = require("./routes/books.router");

const app = express();
const PORT = 3000;

app.use(express.json()); // parse the request body to JSON object
app.use("/books", booksRouter);

app.use((_req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

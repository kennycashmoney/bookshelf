const express = require("express");

const booksRouter = require("./routes/books.router");

const app = express();
const PORT = 3000;

/** Logging Middleware */
app.use((req, _res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use(express.json()); // parse the request body to JSON object
app.use("/books", booksRouter);

/** error handling */
app.use((_req, res) => res.status(404).send("Sorry can't find that!"));
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

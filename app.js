const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");

const booksRouter = require("./routes/books.router");

const app = express();

app.use(morgan("combined")); // logging

/** Swagger Docs */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookshelf",
      version: "1.0.0",
      description: "a RESTful API representation of the bookshelf in my office",
    },
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/** API Router */
app.use(express.json()); // parse the request body to JSON object
app.use("/books", booksRouter);

/** Error Handling */
app.use((_req, res) =>
  res.status(404).json({ error: "Sorry can't find that!" })
);
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

module.exports = app;

const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const booksRouter = require("./routes/books.router");

const app = express();
const PORT = 3000;

/** Swagger Docs */
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bookshelf",
            version: "1.0.0",
            description: "a RESTful API representation of the bookshelf in my office"
        }
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


/** Logging Middleware */
app.use((req, _res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

/** API Router */
app.use(express.json()); // parse the request body to JSON object
app.use("/books", booksRouter);

/** Error Handling */
app.use((_req, res) => res.status(404).send("Sorry can't find that!"));
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

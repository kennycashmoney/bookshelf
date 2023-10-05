const express = require("express");

const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  removeBook,
} = require("../controllers/books.controller");

const booksRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto-generated id of the book
 *              title:
 *                  type: string
 *                  description: The title of the book
 *              author:
 *                  type: string
 *                  description: The author of the book. (defaults to "N/A" if none provided)
 *          example: 
 *              id: 21
 *              title: Siddhartha
 *              author: Hermann Hesse
 */

/**
 * @swagger
 * tags:
 *  - name: Books
 *    description: a RESTful API representation of the bookshelf in my office
 */

/**
 * @swagger
 * /books:
 *  post:
 *      summary: Adds a new book to the bookshelf
 *      tags: [Books]
 *      description: Adds a new book to the books model
 *      requestBody:
 *          description: Information to create a new book object
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          author:
 *                              type: string
 *      responses:
 *          200:
 *              description: Successfully added a new book. Returns the new book JSON
 *          400:
 *              description: Missing book title
 *          500:
 *              description: Something broke!
 */
booksRouter.post("/", addBook);

/**
 * @swagger
 * /books:
 *  get:
 *      summary: Gets all the books on the bookshelf
 *      tags: [Books]
 *      description: Gets all the book objects
 *      responses:
 *          200:
 *              description: Success! Returns all the books JSON
 *          500:
 *              description: Something broke!
 */
booksRouter.get("/", getBooks);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: Gets a specific book from the bookshelf
 *      tags: [Books]
 *      description: Returns a requested book
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: Index ID of the book to GET
 *      responses:
 *          200:
 *              description: Success! Returns the requested book JSON
 *          404:
 *              description: Book not found...
 *          500:
 *              description: Something broke!
 */
booksRouter.get("/:id", getBook);


// no bulk updates
booksRouter.put("/", (_req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

/**
 * @swagger
 * /books/{id}:
 *  put:
 *      summary: Updates an existing book on the bookshelf
 *      tags: [Books]
 *      description: Updates a book in the books model
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: Index ID of the book to UPDATE
 *      responses:
 *          200:
 *              description: Success! Returns the updated book JSON
 *          404:
 *              description: Book not found...
 *          500:
 *              description: Something broke!
 */
booksRouter.put("/:id", updateBook);


// no bulk deletes
booksRouter.delete("/", (_req, res) =>
  res.status(405).json({ error: "Method Not Allowed" })
);

/**
 * @swagger
 * /books/{id}:
 *  delete:
 *      summary: Removes a book from the bookshelf
 *      tags: [Books]
 *      description: Removes a book from the books model
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *            description: Index ID of the book to DELETE
 *      responses:
 *          200:
 *              description: Success! Returns the removed book JSON
 *          404:
 *              description: Book not found...
 *          500:
 *              description: Something broke!
 */
booksRouter.delete("/:id", removeBook);

module.exports = booksRouter;

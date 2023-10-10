const {
  books,
  getNextAutoId,
  incrementNextAutoId,
} = require("../models/books.models");

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
function postBook(req, res) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Missing book title" });
  }

  const { title } = req.body;
  const author = req.body.author ? req.body.author : "N/A";

  const newBook = {
    id: getNextAutoId(),
    title,
    author,
  };

  books.push(newBook);
  incrementNextAutoId();

  res.json(newBook);
}


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
function getBooks(_req, res) {
  res.json(books);
}


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
function getBook(req, res) {
  const bookId = Number(req.params.id);
  const book = books[bookId];

  if (!book) {
    return res.status(404).json({ error: "book not found..." });
  }

  res.json(book);
}


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
function putBook(req, res) {
  const bookId = Number(req.params.id);
  const book = books[bookId];

  if (!book) {
    return res.status(404).json({ error: "book not found..." });
  }

  const { title } = req.body;
  if (!title) {
    return res
      .status(202)
      .json({ error: "No Content. Need to include a title..." });
  }

  book.title = title;
  book.author = req.body.author ? req.body.author : "N/A";

  res.json(book);
}


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
function deleteBook(req, res) {
  const bookId = Number(req.params.id);
  const book = books[bookId];

  if (!book) {
    return res.status(404).json({ error: "book not found..." });
  }

  res.json(books.splice(bookId, 1));
}

module.exports = {
  postBook,
  getBooks,
  getBook,
  putBook,
  deleteBook,
};

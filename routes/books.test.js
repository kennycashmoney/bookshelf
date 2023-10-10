const app = require("../app");
const request = require("supertest");

const testBook = {
  title: "How to test API calls",
  author: "kennycashmoney",
};

const testIDs = {
    getTest: 1,
    putTest: 2,
    deleteTest: 3,
    notFoundTest: 999999,
}

describe("Test POST /books", () => {
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/books")
      .send(testBook)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toMatchObject(testBook);
  });

  test("It should set the author to 'N/A' if no author is provided", async () => {
    const response = await request(app)
      .post("/books")
      .send({ title: "unknown author" })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toMatchObject({
      title: "unknown author",
      author: "N/A",
    });
  });

  test("It should respond with 400 if missing required field 'title'", async () => {
    const response = await request(app)
      .post("/books")
      .send()
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "Missing book title" });
  });
});

describe("Test GET /books", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/books")
      .expect("Content-Type", /json/)
      .expect(200);

    response.body.forEach((book) => {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
    });
  });
});

describe("Test GET /books/{id}", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get(`/books/${testIDs.getTest}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("author");
  });

  test("It should respond with 404 if the book is not found", async () => {
    const response = await request(app)
      .get(`/books/${testIDs.notFoundTest}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toStrictEqual({ error: "book not found..." });
  });
});

describe("Test PUT /books", () => {
  test("It should reject a bulk update with 405 Method Not Allowed", async () => {
    const response = await request(app)
      .put("/books")
      .send()
      .expect("Content-Type", /json/)
      .expect(405);

    expect(response.body).toStrictEqual({ error: "Method Not Allowed" });
  });
});

describe("Test PUT /books/{id}", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .put(`/books/${testIDs.putTest}`)
      .send(testBook)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toMatchObject(testBook);
  });

  test("It should set the author to 'N/A' if no author is provided", async () => {
    const response = await request(app)
      .put(`/books/${testIDs.putTest}`)
      .send({ title: "unknown author" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toMatchObject({
      title: "unknown author",
      author: "N/A",
    });
  });

  test("It should respond with 400 if missing required field 'title'", async () => {
    const response = await request(app)
      .put(`/books/${testIDs.putTest}`)
      .send({ author: "kennycashmoney" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({ error: "Missing book title" });
  });

  test("It should respond with 404 if the book is not found", async () => {
    const response = await request(app)
      .put(`/books/${testIDs.notFoundTest}`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toStrictEqual({ error: "book not found..." });
  });
});

describe("Test DELETE /books", () => {
  test("It should reject a bulk delete with 405 Method Not Allowed", async () => {
    const response = await request(app)
      .put("/books")
      .send()
      .expect("Content-Type", /json/)
      .expect(405);

    expect(response.body).toStrictEqual({ error: "Method Not Allowed" });
  });
});

describe("Test DELETE /books/{id}", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .put(`/books/${testIDs.deleteTest}`)
      .send(testBook)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("author");
  });

  test("It should respond with 404 if the book is not found", async () => {
    const response = await request(app)
      .delete("/books/999999")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toStrictEqual({ error: "book not found..." });
  });
});

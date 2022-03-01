const request = require("supertest");
const app = require("../app");

describe("/posts", () => {
  it("should send back error: tag parameter is required if tag is not entered", async () => {
    request("http://localhost:3000/api/posts/", function (error, res, body) {
      expect(res.statusCode).toEqual(400);
      const errorMessage = "tag parameter is required";
      expect(JSON.stringify(res.body)).toEqual(errorMessage);
    });
  });

  it("should send back error: sortBy parameter is invalid in the JSON body", async () => {
    request(
      "http://localhost:3000/api/posts/tech/likes1",
      function (error, res, body) {
        expect(res.statusCode).toEqual(400);
        const errorMessage = "sortBy parameter is invalid";
        expect(JSON.stringify(res.body)).toEqual(errorMessage);
      }
    );
  });

  it("should send back error: sortBy parameter is invalid in the JSON body", async () => {
    request(
      "http://localhost:3000/api/posts/tech/likes/desc1",
      function (error, res, body) {
        expect(res.statusCode).toEqual(400);
        const errorMessage = "sortBy parameter is invalid";
        expect(JSON.stringify(res.body)).toEqual(errorMessage);
      }
    );
  });

  it("should send back 200 status code with valid search parameters", async () => {
    request(
      "http://localhost:3000/api/posts/tech",
      function (error, res, body) {
        expect(res.statusCode).toEqual(200);
      }
    );
  });

  it("should send back 200 status code with all valid search parameters", async () => {
    request(
      "http://localhost:3000/api/posts/tech/likes/desc",
      function (error, res, body) {
        expect(res.statusCode).toEqual(200);
      }
    );
  });
});

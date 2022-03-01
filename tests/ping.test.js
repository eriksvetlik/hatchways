const request = require("supertest");
const server = require("../server");

describe("/ping", () => {
  it("should send back 200 status code", async () => {
    const res = await request(server).get("/ping");
    expect(res.statusCode).toEqual(200);
  });
});

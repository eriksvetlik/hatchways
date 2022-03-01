const request = require("supertest");
const app = require("../app");

describe("/ping", () => {
  it("should send back 200 status code", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.statusCode).toEqual(200);
  });

  it("should send back success:true in the JSON body", async () => {
    const res = await request(app).get("/api/ping");
    const success = '{"success":true}';
    expect(JSON.stringify(res.body)).toEqual(success);
  });
});

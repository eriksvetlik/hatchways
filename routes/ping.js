const pingRouter = require("express").Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// GET /api/ping
pingRouter.get("/", (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, "Response status code:": res.statusCode });
  } catch (error) {
    console.log(error);
  }
});

module.exports = pingRouter;

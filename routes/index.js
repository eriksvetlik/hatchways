const express = require("express");
const pingRouter = require("./ping");
const postsRouter = require("./posts");

const app = express();

app.use("/ping", pingRouter);
app.use("/posts", postsRouter);

module.exports = app;

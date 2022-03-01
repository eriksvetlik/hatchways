const express = require("express");
const api = require("./routes/index.js");

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

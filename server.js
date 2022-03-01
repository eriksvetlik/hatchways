const express = require("express");
// const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/api/pets', (req, res) => res.json(petData));

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

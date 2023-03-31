const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  getMessages,
  getUsers,
  insertMessage,
  insertUser,
} = require("./database");

const app = express();
const PORT = process.env.PORT;

corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/messages", async (req, res) => {
  res.json(await getMessages());
});

app.post("/messages", async (req, res) => {
  res.json(await insertMessage(req.body));
});

app.get("/users", async (req, res) => {
  res.json(await getUsers());
});

app.post("/users", async (req, res) => {
  res.json(await insertUser(req.body));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

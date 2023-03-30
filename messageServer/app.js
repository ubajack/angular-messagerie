const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8080;

corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/*
app.get("/messages", function (req, res) {
  pool.query(
    "SELECT m.id, m.message, m.date, u.id AS user_id, u.pseudo FROM messages m JOIN users u ON m.user_id = u.id",
    function (error, results, fields) {
      if (error) throw error;

      const formattedResult = results.map((entity) => ({
        id: entity.id,
        message: entity.message,
        date: entity.date,
        user: {
          id: entity.user_id,
          pseudo: entity.pseudo,
        },
      }));
      res.json(formattedResult);
    }
  );
});
*/

app.get("/messages", (req, res) => {
  pool.query(
    "SELECT m.id, m.message, m.date, u.id AS user_id, u.pseudo FROM messages m JOIN users u ON m.user_id = u.id",
    (error, results, fields) => {
      if (error) throw error;

      const formattedResult = results.map(
        ({ id, message, date, user_id, pseudo }) => ({
          id,
          message,
          date,
          user: {
            id: user_id,
            pseudo,
          },
        })
      );
      res.json(formattedResult);
    }
  );
});

app.post("/messages", (req, res) => {
  const { id, message, date, user } = req.body;

  pool.query(
    "INSERT INTO messages SET ?",
    {
      id,
      message,
      date,
      user_id: user.id,
    },
    (error, results, fields) => {
      if (error) throw error;

      return res.json({ id: results.insertId, ...req.body });
    }
  );
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.post("/users", (req, res) => {
  pool.query("INSERT INTO users SET ?", req.body, (error, results, fields) => {
    if (error) throw error;

    return res.json({ id: results.insertId, ...req.body });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

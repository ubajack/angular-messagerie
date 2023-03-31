const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
});

const buildMessage = (results) => {
  return results.map(({ id, message, date, user_id, pseudo }) => ({
    id,
    message,
    date,
    user: {
      id: user_id,
      pseudo,
    },
  }));
};

const getUsers = async () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const getMessages = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT m.id, m.message, m.date, u.id AS user_id, u.pseudo FROM messages m JOIN users u ON m.user_id = u.id",
      (error, results, fields) => {
        if (error) reject(error);
        resolve(buildMessage(results));
      }
    );
  });
};

const getUser = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE id = ?",
      id,
      (error, results, fields) => {
        if (error) reject(error);
        resolve(results.length > 0 ? results[0] : null);
      }
    );
  });
};

const getMessage = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT m.id, m.message, m.date, u.id AS user_id, u.pseudo FROM messages m JOIN users u ON m.user_id = u.id WHERE m.id = ?",
      id,
      (error, results, fields) => {
        if (error) reject(error);
        console.log("results", results);
        resolve(results.length > 0 ? buildMessage(results)[0] : null);
      }
    );
  });
};

const insertUser = async (user) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users SET ?", user, (error, results, fields) => {
      if (error) reject(error);
      resolve({ id: results.insertId, ...user });
    });
  });
};

const insertMessage = async (msg) => {
  const user = msg.user?.id ? msg.user : await insertUser(msg.user);
  const { id, message, date } = msg;
  const messageToInsert = {
    id,
    message,
    date: date.slice(0, -1),
    user_id: user.id,
  };
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO messages SET ?",
      messageToInsert,
      (error, results, fields) => {
        if (error) reject(error);
        resolve({ id: results.insertId, ...msg, user });
      }
    );
  });
};

module.exports = {
  getUsers,
  getMessages,
  getUser,
  getMessage,
  insertUser,
  insertMessage,
};

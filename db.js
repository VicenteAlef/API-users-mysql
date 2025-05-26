require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mydatabase",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados MySQL!", err.message);
  } else {
    console.log("Conectado ao Banco de dados MySQL");
  }
});

module.exports = db;

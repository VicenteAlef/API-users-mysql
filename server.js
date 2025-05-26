const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row.length === 0)
      return res.status(404).json({ message: "Usuario não encontrado!" });
    res.status(200).json(row);
  });
});

app.post("/users", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  db.query(
    "INSERT INTO users (nome, email) VALUES (?, ?)",
    [nome, email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Usuário criado com sucesso",
        id: this.lastID,
        nome,
        email,
      });
    }
  );
});

//ATENÇÃO! Este endpoint deve ser usado apenas em desenvolvimento e teste. Deve ser removido ao subir para produção
app.post("/users-insert-severals", async (req, res) => {
  const users = req.body; // [{ nome, email }, ...]

  if (!Array.isArray(users) || users.length === 0) {
    return res
      .status(400)
      .json({ message: "Envie um array com ao menos um usuário." });
  }

  try {
    const insertPromises = users.map(({ nome, email }) => {
      return new Promise((resolve, reject) => {
        if (!nome || !email) {
          return reject(new Error("Todos os campos são obrigatórios"));
        }

        db.query(
          "INSERT INTO users (nome, email) VALUES (?, ?)",
          [nome, email],
          function (err, result) {
            if (err) return reject(err);
            resolve({
              id: result.insertId,
              nome,
              email,
            });
          }
        );
      });
    });

    const results = await Promise.all(insertPromises);

    res.status(201).json({
      message: "Todos os usuários foram inseridos com sucesso.",
      users: results,
    });
  } catch (err) {
    console.error("Erro ao inserir usuários:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row.affectedRows === 0)
      return res.status(404).json({ message: "Usuario não existente" });
    res.status(200).json({ message: "Usuário deletedado com sucesso" });
  });
});

app.delete("/users-delete-serverals", (req, res) => {
  db.query("DELETE FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.affectedRows === 0)
      return res.status(404).json({ message: "A lista já está vazia" });
    res
      .status(200)
      .json({ message: "Todos os usuarios deletetados com sucesso" });
  });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/users`);
});

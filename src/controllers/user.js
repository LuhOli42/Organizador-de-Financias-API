const bcrypt = require("bcrypt");
const pool = require("../database/database");
const apiKey = require("../apiKey");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const verificarEmail = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (verificarEmail.rowCount > 0) {
      return res.status(400).json({ mensagem: "Email já existente" });
    }
    const senhaCrypto = await bcrypt.hash(senha, 10);

    const cadastrarUser = await pool.query(
      `insert into usuarios (nome, email, senha)
       values ($1, $2, $3) returning *`,
      [nome, email, senhaCrypto]
    );

    return res.status(201).json(cadastrarUser.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const detalharUsuario = async (req, res) => {};

const atualizarUsuario = async (req, res) => {};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  atualizarUsuario,
};

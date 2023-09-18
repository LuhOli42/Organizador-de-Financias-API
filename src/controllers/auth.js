const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiKey = require("../apiKey");
const pool = require("../database/database");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }
  try {
    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount === 0) {
      return res.status(400).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }

    const validade = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!validade) {
      return res.status(400).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }
    const token = await jwt.sign({ id: usuario.rows[0].id }, apiKey, {
      expiresIn: "8h",
    });

    const objUsuario = { ...usuario.rows[0] };
    delete objUsuario.senha;

    return res.status(200).json({
      objUsuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

module.exports = { login };

const bcrypt = require("bcrypt");
const pool = require("../database/database");

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
    const usuario = { ...cadastrarUser.rows[0] }
    delete usuario.senha

    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const detalharUsuario = async (req, res) => {
  const { id } = req.usuario;
  try {
    const { rows } = await pool.query("select * from usuarios where id = $1", [
      id,
    ]);

    const { senha, ...usuario } = rows[0];

    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {
    const verificarEmail = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (verificarEmail.rowCount > 0) {
      if (verificarEmail.rows[0].id !== id) {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        });
      }
    }

    const senhaCrypto = await bcrypt.hash(senha, 10);

    const atualizar = await pool.query(
      `update usuarios
      set nome = $1,
      email = $2,
      senha = $3
      where id = $4
      `,
      [nome, email, senhaCrypto, id]
    );
    return res
      .status(200)
      .json({ mensagem: "Informações atualizadas com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  atualizarUsuario,
};

const pool = require("../database/database");

const listarTransUser = async (req, res) => { };

const detalharTransUser = async (req, res) => { };

const cadastrarTransUser = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const { id } = req.usuario

  try {
    const cadastrarTrans = await pool.query(
      `insert into transacoes (descricao, valor, data, categoria_id, tipo, usuario_id)
       values ($1, $2, $3, $4, $5, $6) returning *`,
      [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(201).json(cadastrarTrans.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const atualizarTransUser = async (req, res) => { };

const cancelarTransUser = async (req, res) => { };

const extratoTrans = async (req, res) => { };

module.exports = {
  listarTransUser,
  detalharTransUser,
  cadastrarTransUser,
  atualizarTransUser,
  cancelarTransUser,
  extratoTrans,
};

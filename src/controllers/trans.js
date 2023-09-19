const pool = require("../database/database");

const listarTransUser = async (req, res) => {
  const { id } = req.usuario
  try {
    const { rows: listaTrans } = await pool.query('select * from transacoes where usuario_id=$1', [id])

    return res.status(200).json(listaTrans);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }

};

const detalharTransUser = async (req, res) => {
  const { id: id_usuario } = req.usuario
  const { id: id_transacao } = req.params

  try {
    const { rows, rowCount } = await pool.query(`
    select * from transacoes where usuario_id=$1 and id=$2` , [id_usuario, id_transacao])

    if (rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Transação não encontrada."
      })
    }

    res.status(200).json(rows[0])


  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const cadastrarTransUser = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body
  const { id } = req.usuario

  try {
    const { rowCount } = await pool.query(
      'select * from categorias where id=$1', [categoria_id]
    )

    if (rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Categoria não encontrada."
      })
    }

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

const atualizarTransUser = async (req, res) => {
  const { id: id_usuario } = req.usuario
  const { id: id_transacao } = req.params
  const { descricao, valor, data, categoria_id, tipo } = req.body

  try {
    const transacaoExiste = await pool.query(`
    select * from transacoes where usuario_id=$1 and id=$2` , [id_usuario, id_transacao])

    if (transacaoExiste.rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Transação não encontrada."
      })
    }
    const categoriasId = await pool.query(
      'select * from categorias where id=$1', [categoria_id]
    )

    if (categoriasId.rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Transação não encontrada."
      })
    }
    const atualizarCategoria = `update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6`

    await pool.query(atualizarCategoria, [descricao, valor, data, categoria_id, tipo, id_transacao])

    return res
      .status(200)
      .json({ mensagem: "Informações atualizadas com sucesso!" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const cancelarTransUser = async (req, res) => {
  const { id: id_usuario } = req.usuario
  const { id: id_transacao } = req.params

  try {
    const { rows, rowCount } = await pool.query(`
    select * from transacoes where usuario_id=$1 and id=$2` , [id_usuario, id_transacao])

    if (rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Transação não encontrada."
      })
    }

    await pool.query('delete from transacoes where id = $1', [id_transacao])
    
    return res
    .status(200)
    .json({ mensagem: "Informações deletadas com sucesso!" });

  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const extratoTrans = async (req, res) => { 

  //select sum(valor) from trasacoes where tipo = entrada
  //select sum(valor) from trasacoes where tipo = saida
  //??????
};

module.exports = {
  listarTransUser,
  detalharTransUser,
  cadastrarTransUser,
  atualizarTransUser,
  cancelarTransUser,
  extratoTrans,
};

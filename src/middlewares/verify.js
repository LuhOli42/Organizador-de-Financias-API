const nomeEmailSenha = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }
  next();
};

const verificarTrans = (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  if (tipo !== 'entrada' && tipo !== 'saida') {
    return res.status(400).json({
      mensagem: "Campo descrição não foi digitado corretamente"
    })
  }
  next();
};


module.exports = { 
  nomeEmailSenha,
  verificarTrans
};

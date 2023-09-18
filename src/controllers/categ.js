const pool = require("../database/database");

const listarCategorias = async (req, res) => {
  try {
    const { rows: categorias } = await pool.query("select * from categorias");

    return res.status(200).json(categorias);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

module.exports = {
  listarCategorias,
};

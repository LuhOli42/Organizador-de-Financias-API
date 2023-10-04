const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "string.mail": "o campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required().messages({
    "any.required": "O campo senha é obrigatório",
    "string.min": "A senha precisa conter no minimo 5 caracteres",
    "string.empty": "O campo senha é obrigatório",
  }),
});

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    "string.mail": "o campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
  }),
  senha: joi.string().min(5).required(),
});

const schemaTransacao = joi.object({
  descricao: joi.string(),
  valor: joi.number().required().messages({
    "number.base": "O valor deve ser um numero",
  }),
  data: joi.string(),
  categoria_id: joi.number().positive().required().messages({
    "number.positive": "O campo categoria_id precisa ser um numero positivo",
    "number.base": "A categoria_id deve ser um numero",
  }),
  tipo: joi
    .string()
    .custom((value, helper) => {
      if (value !== "entrada" && value !== "saida") {
        return helper.message({
          custom: `Prencha o tipo como saida ou entrada`,
        });
      }
    })
    .required()
    .messages({
      "any.required": "O campo tipo é obrigatório",
      "string.empty": "O campo tipo é obrigatório",
    }),
});

module.exports = { schemaLogin, schemaTransacao, schemaUsuario };

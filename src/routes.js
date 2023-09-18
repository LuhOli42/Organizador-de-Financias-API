const express = require("express");
const auth = require("./controllers/auth");
const user = require("./controllers/user");
const trans = require("./controllers/trans");
const categ = require("./controllers/categ");
const { authenticate } = require("./middlewares/authenticate");
const verify = require("./middlewares/verify");

const routes = express();

/**
 * * User routes
 */
routes.post("/usuario", verify.nomeEmailSenha, user.cadastrarUsuario);
routes.post("/login", auth.login);

/**
 * * authenticate routes
 */
// routes.use(mdw.authenticate);

/**
 * * Login routes
 */
routes.get("/usuario", user.detalharUsuario);
routes.put("/usuario", verify.nomeEmailSenha, user.atualizarUsuario);
routes.get("/categoria", categ.listarCategorias);
routes.get("/transacao", trans.listarTransUser);
routes.get("/transacao/:id", trans.detalharTransUser);
routes.post("/transacao", trans.cadastrarTransUser);
routes.put("/transacao/:id", trans.atualizarTransUser);
routes.delete("/transacao/:id", trans.cancelarTransUser);
routes.get("/transacao/extrato", trans.extratoTrans);

module.exports = routes;

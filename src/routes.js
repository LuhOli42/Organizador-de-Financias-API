const express = require("express");
const login = require("./controllers/login");
const user = require("./controllers/user");
const transcation = require("./controllers/transactions");
const categ = require("./controllers/categ");
const authenticate = require("./middlewares/authenticate");
const { verifyBodyRequest } = require("./middlewares/verify");
const {
  schemaTransacao,
  schemaUsuario,
  schemaLogin,
} = require("./utils/schemas");

const routes = express();

/**
 * * User routes
 */
routes.post(
  "/usuario",
  verifyBodyRequest(schemaUsuario),
  user.cadastrarUsuario
);
routes.post("/login", verifyBodyRequest(schemaLogin), login.login);

/**
 * * authenticate routes
 */
routes.use(authenticate);

/**
 * * Login routes
 */
routes.get("/usuario", user.detalharUsuario);
routes.put("/usuario", verifyBodyRequest(schemaUsuario), user.atualizarUsuario);
routes.get("/categoria", categ.listarCategorias);
routes.get("/transacao", transcation.listarTransUser);
routes.get("/transacao/extrato", transcation.extratoTrans);
routes.get("/transacao/:id", transcation.detalharTransUser);
routes.post(
  "/transacao",
  verifyBodyRequest(schemaTransacao),
  transcation.cadastrarTransUser
);
routes.put(
  "/transacao/:id",
  verifyBodyRequest(schemaTransacao),
  transcation.atualizarTransUser
);
routes.delete("/transacao/:id", transcation.cancelarTransUser);

module.exports = routes;

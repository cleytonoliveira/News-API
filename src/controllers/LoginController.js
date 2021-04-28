const rescue = require('express-rescue');
const { LoginService } = require('../services');

/**
 * Controler responsável por realizar o processo de autenticação
 *
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {Object} res
 * @returns {Object} Retorna dados do usuário com token
 * @throws {Object} Retorna uma chave message com o erro
 */
const auth = rescue(async (req, res) => {
  const { email, password } = req.body;

  const userAuth = await LoginService.auth(email, password);

  return res
    .status(200)
    .json({ token: userAuth });
});

module.exports = {
  auth,
};

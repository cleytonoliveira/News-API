const Boom = require('@hapi/boom');
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
const auth = async (req, res) => {
  const { email, password } = req.body;

  const userAuth = await LoginService.auth(email, password);

  if (userAuth.error) throw Boom.unauthorized(userAuth.message);

  return res
    .status(200)
    .json(userAuth);
};

module.exports = {
  auth,
};

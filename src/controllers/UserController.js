const Boom = require('@hapi/boom');
const { UserService } = require('../services');

/**
 * Controler responsável por realizar o cadastro do usuário
 *
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} req.body.picture
 * @param {Object} res
 * @returns {Object} Retorna dados do usuário com token
 * @throws {Object} Retorna uma chave message com o erro
 */
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    picture,
  } = req.body;

  const userRegistered = await UserService.register(name, email, password, picture);

  if (userRegistered.error) throw Boom.conflict(userRegistered.message);

  return res
    .status(201)
    .json(userRegistered);
};

module.exports = {
  register,
};

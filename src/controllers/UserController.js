// const Boom = require('@hapi/boom');
const { UserService } = require('../services');

/**
 * Controler responsible for regiter a new user
 *
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.name
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {string} req.body.picture
 * @param {Object} res
 * @returns {Object} Returns user data with token
 * @throws {Object} Returns a message key with error
 */
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    picture,
  } = req.body;

  const userRegistered = await UserService.register(name, email, password, picture);

  return res
    .status(201)
    .json(userRegistered);
};

module.exports = {
  register,
};

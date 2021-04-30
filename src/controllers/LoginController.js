const { LoginService } = require('../services');

/**
 * Controler responsible for authentication process
 *
 * @param {Object} req
 * @param {Object} req.body
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @param {Object} res
 * @returns {Object} Returns user data with token
 * @throws {Object} Returns a message key with error
 */
const auth = async (req, res) => {
  const { email, password } = req.body;

  const userAuth = await LoginService.auth(email, password);

  return res
    .status(200)
    .json(userAuth);
};

module.exports = {
  auth,
};

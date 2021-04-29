const { User } = require('../database/models');
const { generateToken } = require('../utils');

const isValidField = {
  error: true,
  message: 'Invalid Field',
};

/**
 * Responsável pela lógica para autenticar e gerar token
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} picture
 * @returns
 */
const register = async (name, email, password, picture) => {
  const user = await User.query().insert({
    name,
    email,
    password,
    picture,
  });

  const token = generateToken(email, user.id);

  return { user: { id: user.id, name, email }, token };
};

module.exports = {
  register,
};

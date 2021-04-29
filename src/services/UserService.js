const { User } = require('../database/models');
const { generateToken } = require('../utils');

const isEmailAlreadyRegistered = {
  error: true,
  message: 'Email already registered.',
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
  const isUserAlreadyRegistered = await User.query().findOne({ email });
  if (isUserAlreadyRegistered) return isEmailAlreadyRegistered;

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

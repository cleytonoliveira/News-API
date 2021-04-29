const { User } = require('../database/models');
const { generateToken } = require('../utils');

const isEmailAlreadyRegistered = {
  error: true,
  message: 'Email already registered.',
};

/**
 * Responsible to regiter and verify regitered users
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} picture
 * @returns {{ user: { id: number, name: string, email: string }, token: string } |
 * { error: boolean, message: string } } Returns user with token or error message
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

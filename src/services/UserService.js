const { User } = require('../database/models');
const { generateToken, isEmailAlreadyRegistered } = require('../utils');

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
  await isEmailAlreadyRegistered(email);

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

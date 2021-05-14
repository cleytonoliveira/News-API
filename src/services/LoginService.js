const { User } = require('../database/models');
const {
  generateToken, isValidField, compareHash, isValidPassword,
} = require('../utils');

/**
 * Responsible for authenticate and generate token
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ user: { id: number, email: string, role: string }, token: string } |
 * { error: boolean, message: string } } Returns user with token or error message
 */
const auth = async (email, password) => {
  const user = await User.query()
    .findOne({ email });
  isValidField(user);

  const isTrueHash = await compareHash(password, user.password);
  isValidPassword(isTrueHash);

  const token = generateToken(email, user.id, user.role);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
};

module.exports = {
  auth,
};

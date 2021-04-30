const { User } = require('../database/models');
const { generateToken, isValidField } = require('../utils');

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
    .select('id', 'email', 'role')
    .findOne({ email })
    .where({ password });

  isValidField(user);
  const token = generateToken(email, user.id, user.role);
  return { user, token };
};

module.exports = {
  auth,
};

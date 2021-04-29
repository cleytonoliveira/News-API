const { User } = require('../database/models');
const { generateToken } = require('../utils');

const isValidField = {
  error: true,
  message: 'Invalid Field',
};

/**
 * Responsável pela lógica para autenticar e gerar token
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ user: { id: number, email: string, role: string }, token: string } |
 * { error: boolean, message: string } } Retorna o user com token ou erro com mensagem
 */
const auth = async (email, password) => {
  const user = await User.query()
    .select('id', 'email', 'role')
    .findOne({ email })
    .where({ password });

  if (!user) return isValidField;

  const token = generateToken(email, user.id, user.role);

  return { user, token };
};

module.exports = {
  auth,
};

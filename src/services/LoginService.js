const { generateToken } = require('../utils');

/**
 * Responsável pela lógica para autenticar e gerar token
 *
 * @param {string} email
 * @returns Retorna o token
 */
const auth = (email) => generateToken(email);

module.exports = {
  auth,
};

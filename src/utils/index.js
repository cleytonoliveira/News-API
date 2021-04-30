const { generateToken, validateToken } = require('./jwt');
const {
  isValidField,
  isAdminAccess,
  isAuthorIdExists,
  isArticleIdExists,
  isEmailAlreadyRegistered,
} = require('./handleMessageError');

module.exports = {
  isEmailAlreadyRegistered,
  isArticleIdExists,
  isAuthorIdExists,
  generateToken,
  validateToken,
  isAdminAccess,
  isValidField,
};

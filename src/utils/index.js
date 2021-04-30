const { generateToken, validateToken } = require('./jwt');
const {
  isValidField,
  isAdminAccess,
  isAnonymousUser,
  isAuthorIdExists,
  isArticleIdExists,
  isEmailAlreadyRegistered,
} = require('./handleMessageError');

module.exports = {
  isEmailAlreadyRegistered,
  isArticleIdExists,
  isAuthorIdExists,
  isAnonymousUser,
  generateToken,
  validateToken,
  isAdminAccess,
  isValidField,
};

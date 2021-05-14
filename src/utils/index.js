const { generateToken, validateToken } = require('./jwt');
const { generateHash, compareHash } = require('./bcrypt');
const {
  isValidField,
  isAdminAccess,
  isAnonymousUser,
  isValidPassword,
  isAuthorIdExists,
  isArticleIdExists,
  isEmailAlreadyRegistered,
} = require('./handleMessageError');

module.exports = {
  isEmailAlreadyRegistered,
  isArticleIdExists,
  isAuthorIdExists,
  isAnonymousUser,
  isValidPassword,
  generateToken,
  validateToken,
  isAdminAccess,
  generateHash,
  isValidField,
  compareHash,
};

const validateArticleFields = require('./validateArticleFields');
const validateAuthorFields = require('./validateAuthorFields');
const validateUserFields = require('./validateUserFields');
const authentication = require('./authentication');
const handleError = require('./handleError');

module.exports = {
  validateArticleFields,
  validateAuthorFields,
  validateUserFields,
  authentication,
  handleError,
};

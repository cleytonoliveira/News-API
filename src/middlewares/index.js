const validateAdminFields = require('./validateAdminFields');
const validateUserFields = require('./validateUserFields');
const authentication = require('./authentication');
const handleError = require('./handleError');

module.exports = {
  validateAdminFields,
  validateUserFields,
  authentication,
  handleError,
};

const rescue = require('express-rescue');

/**
 * @param {Object} req
 * @param {Object} res
 */
const auth = rescue(async (req, res) => {
  return res
    .status(200)
    .json();
});

module.exports = {
  auth,
};

const bcrypt = require('bcryptjs');

const generateHash = (password) => {
  const salt = 10;
  return bcrypt.hash(password, salt);
};

const compareHash = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  generateHash,
  compareHash,
};

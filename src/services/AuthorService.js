const { Author } = require('../database/models');

const notPermittedAcess = {
  error: true,
  message: 'Only administrator can access',
};

const register = async (name, picture, role) => {
  if (role !== 'admin') return notPermittedAcess;

  const author = await Author.query().insert({
    name,
    picture,
  });

  return { id: author.id, name, picture };
};

// const findAll = async (req, res) => {

// };

// const findById = async (req, res) => {

// };

// const update = async (req, res) => {

// };

// const remove = async (req, res) => {

// };

module.exports = {
  register,
  // findById,
  // findAll,
  // remove,
  // update,
};

const Boom = require('@hapi/boom');
const { AuthorService } = require('../services');

const register = async (req, res) => {
  const { name, picture } = req;
  const { role } = req.sub;

  const authorRegistered = await AuthorService.register(name, picture, role);

  if (authorRegistered) throw Boom.unauthorized(authorRegistered.message);

  return res
    .status(201)
    .json(authorRegistered);
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

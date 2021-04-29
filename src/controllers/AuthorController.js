const Boom = require('@hapi/boom');
const { AuthorService } = require('../services');

const register = async (req, res) => {
  const { name, picture } = req.body;
  const { role } = req.sub;

  const authorRegistered = await AuthorService.register(name, picture, role);

  if (authorRegistered.error) throw Boom.unauthorized(authorRegistered.message);

  return res
    .status(201)
    .json(authorRegistered);
};

const findAll = async (req, res) => {
  const { role } = req.sub;

  const authors = await AuthorService.findAll(role);

  if (authors.error) throw Boom.unauthorized(authors.message);

  return res
    .status(200)
    .json(authors);
};

// const findById = async (req, res) => {

// };

// const update = async (req, res) => {

// };

// const remove = async (req, res) => {

// };

module.exports = {
  register,
  // findById,
  findAll,
  // remove,
  // update,
};

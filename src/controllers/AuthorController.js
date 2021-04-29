const { AuthorService } = require('../services');

const register = async (req, res) => {
  const { name, picture } = req.body;
  const { role } = req.sub;

  const authorRegistered = await AuthorService.register(name, picture, role);

  return res
    .status(201)
    .json(authorRegistered);
};

const findAll = async (req, res) => {
  const { role } = req.sub;

  const authors = await AuthorService.findAll(role);

  return res
    .status(200)
    .json(authors);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.sub;

  const authorById = await AuthorService.findById(id, role);

  return res
    .status(200)
    .json(authorById);
};

// const update = async (req, res) => {

// };

// const remove = async (req, res) => {

// };

module.exports = {
  register,
  findById,
  findAll,
  // remove,
  // update,
};

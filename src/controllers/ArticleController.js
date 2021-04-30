const { ArticleService } = require('../services');

const register = async (req, res) => {
  const {
    title,
    category,
    summary,
    firstParagraph,
    body,
    authorId,
  } = req.body;
  const { role } = req.sub;

  const articleCreated = await ArticleService
    .register(title, category, summary, firstParagraph, body, authorId, role);

  return res
    .status(201)
    .json(articleCreated);
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

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

const findAll = async (req, res) => {
  const { role } = req.sub;

  const articles = await ArticleService.findAll(role);

  return res
    .status(200)
    .json(articles);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { role } = req.sub;

  const articleById = await ArticleService.findById(id, role);

  return res
    .status(200)
    .json(articleById);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { role } = req.sub;

  const article = await ArticleService.update(id, role, body);

  return res
    .status(200)
    .json(article);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { role } = req.sub;

  const article = await ArticleService.remove(id, role);

  return res
    .status(204)
    .json(article);
};

const findByIdAnonymous = async (req, res) => {
  const { id } = req.params;
  const { role } = req.sub;

  const article = await ArticleService.findByIdAnonymous(id, role);

  return res
    .status(200)
    .json(article);
};

const findCategory = async (req, res) => {
  const { category } = req.query;

  const categories = await ArticleService.findCategory(category);

  return res
    .status(200)
    .json(categories);
};

module.exports = {
  findByIdAnonymous,
  findCategory,
  register,
  findById,
  findAll,
  remove,
  update,
};

const { Article } = require('../database/models');
const { isAdminAccess, isArticleIdExists } = require('../utils');

const register = async (title, category, summary, firstParagraph, body, authorId, role) => {
  isAdminAccess(role);
  const newArticle = await Article.query().insert({
    title, category, summary, firstParagraph, body, authorId,
  });
  return newArticle;
};

const findAll = async (role) => {
  isAdminAccess(role);
  const articles = await Article.query()
    .select('id', 'title', 'category', 'summary', 'firstParagraph', 'body')
    .withGraphFetched('author');
  return articles;
};

const findById = async (id, role) => {
  isAdminAccess(role);
  const articleById = await Article.query()
    .select('id', 'title', 'category', 'summary', 'firstParagraph', 'body')
    .findById(id)
    .withGraphFetched('author');
  isArticleIdExists(articleById);
  return articleById;
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

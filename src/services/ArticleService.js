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

const update = async (id, role, body) => {
  const {
    title, category, summary, firstParagraph, body: content, authorId,
  } = body;

  isAdminAccess(role);
  const article = Article.query()
    .patchAndFetchById(id, {
      title,
      category,
      summary,
      firstParagraph,
      body: content,
      authorId,
    });
  return article;
};

const remove = async (id, role) => {
  isAdminAccess(role);
  const article = await Article.query().deleteById(id);
  return article;
};

module.exports = {
  register,
  findById,
  findAll,
  remove,
  update,
};

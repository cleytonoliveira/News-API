const { Article } = require('../database/models');
const { isAdminAccess } = require('../utils');

const register = async (title, category, summary, firstParagraph, body, authorId, role) => {
  isAdminAccess(role);
  const newArticle = await Article.query().insert({
    title, category, summary, firstParagraph, body, authorId,
  });
  return newArticle;
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

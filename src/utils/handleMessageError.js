const Boom = require('@hapi/boom');
const { User } = require('../database/models');

const isAdminAccess = (role) => {
  if (role !== 'admin') throw Boom.unauthorized('Only administrator can access');
};

const isValidField = (user) => {
  if (!user) throw Boom.unauthorized('Invalid Field');
};

const isEmailAlreadyRegistered = async (email) => {
  const isUserAlreadyRegistered = await User.query().findOne({ email });
  if (isUserAlreadyRegistered) throw Boom.conflict('Email already registered.');
};

const isAuthorIdExists = (authorById) => {
  if (!authorById) throw Boom.notFound('Author not found');
};

const isArticleIdExists = (articleById) => {
  if (!articleById) throw Boom.notFound('Article not found');
};

module.exports = {
  isValidField,
  isAdminAccess,
  isAuthorIdExists,
  isArticleIdExists,
  isEmailAlreadyRegistered,
};

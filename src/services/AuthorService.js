const Boom = require('@hapi/boom');
const { Author } = require('../database/models');

const isAdminAccess = (role) => {
  if (role !== 'admin') throw Boom.unauthorized('Only administrator can access');
  return role;
};

const isAuthorIdExists = (authorById) => {
  if (!authorById) throw Boom.notFound('Author not found');
};

const register = async (name, picture, role) => {
  isAdminAccess(role);
  const author = await Author.query().insert({
    name,
    picture,
  });

  return { id: author.id, name, picture };
};

const findAll = async (role) => {
  isAdminAccess(role);
  const authors = await Author.query();
  return authors;
};

const findById = async (id, role) => {
  isAdminAccess(role);
  const authorById = await Author.query().findById(id);
  isAuthorIdExists(authorById);
  return authorById;
};

const update = async (id, role, name, picture) => {
  isAdminAccess(role);
  const author = await Author.query()
    .patchAndFetchById(id, {
      name,
      picture,
    });
  return author;
};

const remove = async (id, role) => {
  isAdminAccess(role);
  const author = await Author.query().deleteById(id);
  return author;
};

module.exports = {
  register,
  findById,
  findAll,
  remove,
  update,
};

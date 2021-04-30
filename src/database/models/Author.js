const { Model } = require('objection');
const Article = require('./Article');

const connection = require('../config/connection');

Model.knex(connection);

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get relationMappings() {
    return {
      article: {
        relation: Model.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'authors.id',
          to: 'articles.authorId',
        },
      },
    };
  }
}

module.exports = Author;

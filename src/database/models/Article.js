const { Model } = require('objection');
const Author = require('./Author');

const connection = require('../config/connection');

Model.knex(connection);

class Article extends Model {
  static get tableName() {
    return 'articles';
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'articles.authorId',
          to: 'authors.id',
        },
      },
    };
  }
}

module.exports = Article;

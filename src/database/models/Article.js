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
          from: 'articles.author_id',
          to: 'authors.id',
        },
      },
    };
  }
}

module.exports = Article;

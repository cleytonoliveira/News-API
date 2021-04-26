const { Model } = require('objection');
const database = require('../config/database');

Model.knex(database);

class Article extends Model {
  static get tableName() {
    return 'articles';
  }
}

module.exports = Article;

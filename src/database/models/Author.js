const { Model } = require('objection');
const database = require('../config/database');

Model.knex(database);

class Author extends Model {
  static get tableName() {
    return 'authors';
  }
}

module.exports = Author;

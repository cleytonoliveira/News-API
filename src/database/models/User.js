const { Model } = require('objection');
const database = require('../config/database');

Model.knex(database);

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;

const { Model } = require('objection');

const connection = require('../config/connection');

Model.knex(connection);

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;

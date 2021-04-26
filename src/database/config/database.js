const Knex = require('knex');
const config = require('../../../knexfile');

const db = Knex(config.development);

module.exports = db;

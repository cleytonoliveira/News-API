const Knex = require('knex');
const config = require('../../../knexfile');

const enviroment = process.env.NODE_ENV || 'development';
const connectionConfig = config[enviroment];
const connection = Knex(connectionConfig);

module.exports = connection;

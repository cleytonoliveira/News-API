exports.up = (knex) => knex.schema
  .createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').notNullable().defaultTo('user');
    table.string('picture').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('users');

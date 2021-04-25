exports.up = (knex) => knex.schema
  .createTable('authors', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('picture').notNullable();
  });

exports.down = (knex) => knex.schema
  .dropTable('authors');

exports.up = (knex) => knex.schema
  .createTable('articles', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('category').notNullable();
    table.string('summary').notNullable();
    table.string('firstParagraph').notNullable();
    table.string('body').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema
  .dropTable('articles');

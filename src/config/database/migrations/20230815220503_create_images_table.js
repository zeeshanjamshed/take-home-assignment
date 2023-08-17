exports.up = async function (knex) {
  return knex.schema.createTable('images', function (table) {
    table.increments('id').primary();
    table.string('url');
    table.string('title');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('images');
};

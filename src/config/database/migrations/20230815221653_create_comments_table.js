exports.up = async function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('image_id').unsigned()
    table.foreign('image_id').references('images.id');
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('comments');
};

exports.up = knex =>
  knex.schema.createTable('events', (t) => {
    t.increments('id').primary();
    t.string('topic').notNullable();
    t.string('date').notNullable();
    t.string('details');
    t.string('place');
    t.string('extra');
    t.integer('team');
  });

exports.down = knex => knex.schema.dropTableIfExists('events');

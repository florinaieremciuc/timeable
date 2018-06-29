exports.up = knex =>
  knex.schema.table('events', (t) => {
    t.string('name');
  });

exports.down = knex => knex.schema.dropTableIfExists('events');

exports.up = knex =>
  knex.schema.table('events', (t) => {
    t.dropColumn('team');
  });

exports.down = knex => knex.schema.dropTableIfExists('events');

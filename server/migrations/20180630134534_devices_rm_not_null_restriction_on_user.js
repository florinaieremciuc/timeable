exports.up = knex =>
  knex.schema.table('devices', (t) => {
    t.string('price').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('devices');

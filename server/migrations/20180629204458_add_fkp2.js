exports.up = knex =>
  knex.schema.table('events', (t) => {
    t.integer('team')
      .unsigned()
      .references('teams.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('events');

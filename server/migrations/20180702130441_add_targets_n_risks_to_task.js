exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t.integer('target')
      .unsigned()
      .references('targets.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('risk')
      .unsigned()
      .references('risks.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('tasks');

exports.up = knex =>
  knex.schema.table('projects', (t) => {
    t
      .integer('team')
      .unsigned()
      .notNullable();
    t
      .foreign('team')
      .references('teams.id')
      .onDelete('RESTRICT');
  });

exports.down = () => {};

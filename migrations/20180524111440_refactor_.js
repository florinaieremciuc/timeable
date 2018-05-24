exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t
      .integer('user')
      .unsigned()
      .notNullable();
    t
      .foreign('user')
      .references('users.id')
      .onDelete('RESTRICT');
    t
      .integer('project')
      .unsigned()
      .notNullable();
    t
      .foreign('project')
      .references('projects.id')
      .onDelete('RESTRICT');
  });

exports.down = () => {};

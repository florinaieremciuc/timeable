exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t
      .foreign('assignor')
      .references('users.id')
      .onDelete('RESTRICT');
    t
      .foreign('assignee')
      .references('users.id')
      .onDelete('RESTRICT');
  });

exports.down = () => {};

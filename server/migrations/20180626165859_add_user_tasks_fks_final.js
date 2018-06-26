exports.up = knex =>
  knex.schema.table('users_tasks', (t) => {
    t.integer('user_id')
      .unsigned()
      .references('users.id');
    t.integer('task_id')
      .unsigned()
      .references('tasks.id');
  });

exports.down = () => {};

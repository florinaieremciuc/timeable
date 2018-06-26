exports.up = knex =>
  knex.schema.table('users_tasks', (t) => {
    t.dropColumn('user_id');
    t.dropColumn('task_id');
  });

exports.down = () => {};

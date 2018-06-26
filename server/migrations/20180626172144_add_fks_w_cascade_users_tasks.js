exports.up = knex =>
  knex.schema.table('users_tasks', (t) => {
    t.dropForeign('user_id');
    t.dropForeign('task_id');
    t.dropColumn('user_id');
    t.dropColumn('task_id');
  });

exports.down = () => {};

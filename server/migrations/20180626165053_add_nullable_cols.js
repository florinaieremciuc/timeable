exports.up = knex =>
  knex.schema.table('users_tasks', (t) => {
    t.dropColumn('user_id');
    t.dropForeign('user_id');
    t.dropColumn('task_id');
    t.dropForeign('task_id');
  });

exports.down = () => {};

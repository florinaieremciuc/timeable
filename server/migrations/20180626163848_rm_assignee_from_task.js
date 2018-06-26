exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t.dropForeign('assignee', 'tasks_assignee_foreign');
    t.dropColumn('assignee');
  });

exports.down = () => {};

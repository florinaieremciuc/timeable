exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t.dropColumn('user');
    t.dropColumn('project');
  });

exports.down = () => {};

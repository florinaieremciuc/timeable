exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    // remove assignor column from tasks table as it will always be the teamlead
    // each team has only one team lead -> redundant data
    t.dropForeign('assignor');
    t.dropColumn('assignor');
  });

exports.down = () => {};

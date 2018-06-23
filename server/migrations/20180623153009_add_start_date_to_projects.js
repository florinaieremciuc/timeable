exports.up = knex =>
  knex.schema.table('projects', (projectsTable) => {
    projectsTable.string('startDate');
  });
exports.down = () => {};

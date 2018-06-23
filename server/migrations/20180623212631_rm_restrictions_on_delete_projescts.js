exports.up = knex =>
  knex.schema.table('tasks', (t) => {
    t.dropForeign('assignee', 'tasks_assignee_foreign');
    t.foreign('assignee')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.dropForeign('project', 'tasks_project_foreign');
    t.foreign('project')
      .references('projects.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = () => {};

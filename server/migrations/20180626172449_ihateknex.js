exports.up = knex =>
  knex.schema.table('users_tasks', (t) => {
    t.integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.integer('task_id')
      .unsigned()
      .references('tasks.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = () => {};

exports.up = knex =>
  knex.schema.createTable('users_tasks', (t) => {
    t.increments('id').primary();
    t.integer('user_id').notNullable();
    t.integer('task_id').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('users_tasks');

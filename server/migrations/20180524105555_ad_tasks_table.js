exports.up = knex =>
  knex.schema.createTable('tasks', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('duration').notNullable();
    t.string('description');
    t.enu('status', ['to_do', 'doing', 'done', 'testing', '*']).notNullable();
    t.enu('priority', [0, 1, 2, 3]).notNullable();
    // priorities:
    // 0 - nth - mild priority
    // 1 - enhancement - medium priority
    // 2 - new feature - medium-high priority
    // 3 - bug - high priority
  });

exports.down = knex => knex.schema.dropTableIfExists('teams');

exports.up = knex =>
  knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t
      .string('username')
      .notNullable()
      .unique();
    t.string('password').notNullable();
    t.timestamps(false, true);
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t
      .string('email')
      .notNullable()
      .unique();
    t.string('phone').notNullable();
    t.enu('role', ['teamlead', 'frontend', 'backend', 'tester', 'sysadmin', '*']);
  });

exports.down = knex => knex.schema.dropTableIfExists('users');

exports.up = knex =>
  knex.schema.createTable('teams', (t) => {
    t.increments('id').primary();
    t
      .string('name')
      .notNullable()
      .unique();
  });

exports.down = knex => knex.schema.dropTableIfExists('teams');

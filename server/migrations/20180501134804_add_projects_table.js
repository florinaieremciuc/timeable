exports.up = knex =>
  knex.schema.createTable('projects', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('description');
    t.string('deadline').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('projects');

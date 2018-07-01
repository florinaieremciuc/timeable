exports.up = knex =>
  knex.schema.createTable('targets', (t) => {
    t.increments('id').primary();
    t.string('description').notNullable();
    t.boolean('achieved');
    t.integer('project')
      .unsigned()
      .references('projects.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('targets');

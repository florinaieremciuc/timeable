exports.up = knex =>
  knex.schema.createTable('devices', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('specs').notNullable();
    t.string('startDate').notNullable();
    t.string('endDate').notNullable();
    t.integer('project')
      .unsigned()
      .references('projects.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    t.integer('user')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('devices');

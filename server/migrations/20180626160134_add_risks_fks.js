exports.up = knex =>
  knex.schema.table('risks', (t) => {
    t.integer('project')
      .unsigned()
      .notNullable();
    t.foreign('project')
      .references('projects.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

exports.down = () => {};

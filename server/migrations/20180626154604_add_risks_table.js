exports.up = knex =>
  knex.schema.createTable('risks', (t) => {
    t.increments('id').primary();
    t.string('description').notNullable();
    t.enu('category', [
      'technical',
      'management',
      'organizational',
      'comercial',
      'external',
    ]).notNullable();
    t.enu('probability', [1, 2, 3]).notNullable();
    /**
     * 1 - unlikely to occur
     * 2 - may or may not occur
     * 3 - likely to occur
     */
    t.enu('impact', [1, 2, 3]).notNullable();
    /**
     * 1 - minimal
     * 2 - moderate
     * 3 - significant
     */
    t.enu('response', ['watch', 'accept', 'transfer', 'mitigate', 'avoid']).notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('risks');

exports.up = function(knex, Promise) {
  return knex.schema.createTable("organizations", t => {
    t.increments("id").primary();
    t.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("organizations");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", t => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.integer("organization").unsigned();
    t
      .foreign("organization")
      .references("organizations.id")
      .onDelete("RESTRICT");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};

exports.up = function(knex, Promise) {
  return knex.schema.table("users", t => {
    t
      .integer("team")
      .unsigned()
      .notNullable();
    t
      .foreign("team")
      .references("teams.id")
      .onDelete("RESTRICT");
  });
};

exports.down = function(knex, Promise) {};

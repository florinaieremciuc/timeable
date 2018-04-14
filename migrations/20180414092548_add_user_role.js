exports.up = function(knex, Promise) {
  return knex.schema.table("users", t => {
    t
      .enu("role", [
        "teamlead",
        "frontend",
        "backend",
        "tester",
        "sysadmin",
        "*"
      ])
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

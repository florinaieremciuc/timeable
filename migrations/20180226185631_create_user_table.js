exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments("id").primary();
    t.string("username").notNullable();
    t.string("password").notNullable();
    t.timestamps(false, true);
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("email").notNullable();
    t.string("phone").notNullable();
    t.enu("role", [
      "teamlead",
      "frontend",
      "backend",
      "tester",
      "sysadmin",
      "*"
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

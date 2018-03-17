exports.up = function(knex, Promise) {
  return knex.schema.table("users", t => {
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("email").notNullable();
    t.string("phone").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

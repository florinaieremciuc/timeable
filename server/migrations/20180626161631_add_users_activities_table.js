exports.up = knex => knex.schema.dropTableIfExists('users_tasks');

exports.down = knex => knex.schema.dropTableIfExists('users_tasks');

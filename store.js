const knex = require("knex")(require("./knexfile"));

module.exports = {
  createUser({ username, password }) {
    console.log(`Add user ${username} w pass ${password}`);
    return knex("user").insert({
      username,
      password
    });
  }
};

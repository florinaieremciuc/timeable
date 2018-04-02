const knex = require("knex")(require("../knexfile"));

module.exports = {
  createTeam({ name, organization }) {
    console.log(`Add team ${name}`);
    return knex("teams").insert({
      name,
      organization
    });
  },
  getTeam({ name }) {
    // get team
  },
  updateTeam({ name }) {
    // update team
  },
  deleteTeam({ name }) {
    // delete team
  }
};

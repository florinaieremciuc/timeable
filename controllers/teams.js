const knex = require("knex")(require("../knexfile"));

module.exports = {
  create({ name }) {
    console.log(`Add team ${name}`);
    return knex("teams").insert({
      name
    });
  },
  getAll() {
    console.log("Get teams list");
    return knex.select().from("teams");
  },
  getOne(id) {
    console.log(`Get team w id ${id}`);
    return knex("teams").where("id", id);
  },
  update(id, name) {
    console.log(`Updating team having id ${id} w ${name}`);
    return knex("teams")
      .where("id", id)
      .update({
        name: name
      });
  },
  delete(id) {
    console.log(`Delete team w id ${id}`);
    return knex("teams")
      .where("id", id)
      .del();
  }
};

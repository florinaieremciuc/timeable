const knex = require("knex")(require("../knexfile"));

module.exports = {
  create({ name }) {
    console.log(`Add organization ${name}`);
    return knex("organizations").insert({
      name
    });
  },
  getAll() {
    console.log("Get organizations list");
    return knex.select().from("organizations");
  },
  getOne(id) {
    console.log(`Get organization w id ${id}`);
    return knex("organizations").where("id", id);
  },
  update(id, name) {
    console.log(`Updating organization having id ${id} w ${name}`);
    return knex("organizations")
      .where("id", id)
      .update({
        name: name
      });
  },
  delete(id) {
    console.log(`Delete organization w id ${id}`);
    return knex("organizations")
      .where("id", id)
      .del();
  }
};

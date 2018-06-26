const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({ name }) {
    console.log(`Add team ${name}`);
    return knex('teams').insert({
      name,
    });
  },
  getAll() {
    console.log('Get teams list');
    return knex.select().from('teams');
  },
  getOne(id) {
    console.log(`Get team w id ${id}`);
    return knex('teams')
      .where('id', id)
      .then(([team]) => {
        if (!team) return { error: 'Team does not exist' };
        return { success: true, team };
      });
  },
  update(id, newname) {
    console.log(`Updating team having id ${id} w ${newname}`);
    return knex('teams')
      .where('id', id)
      .update({
        name: newname,
      });
  },
  delete(id) {
    console.log(`Delete team w id ${id}`);
    return knex('teams')
      .where('id', id)
      .del();
  },
};

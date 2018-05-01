const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    name, description, deadline, team,
  }) {
    console.log(`Add project ${name}`);
    return knex('projects').insert({
      name,
      description,
      deadline,
      team,
    });
  },
  getAll(teamid) {
    console.log(`Get projects list from ${teamid} team`);
    return knex('projects').where('team', teamid);
  },
  getOne(id) {
    console.log(`Get project w id ${id}`);
    return knex('projects')
      .where('id', id)
      .then(([project]) => {
        if (!project) return { error: 'Project does not exist' };
        return { success: true, project };
      });
  },
  update(id, newname) {
    console.log(`Updating project having id ${id} w ${newname}`);
    return knex('projects')
      .where('id', id)
      .update({
        name: newname,
      });
  },
  delete(id) {
    console.log(`Delete project w id ${id}`);
    return knex('projects')
      .where('id', id)
      .del();
  },
};

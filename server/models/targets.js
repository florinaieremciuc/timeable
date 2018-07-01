const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({ description, achieved, project }) {
    console.log(`Add target ${description}`);
    return knex('targets').insert({
      description,
      achieved,
      project,
    });
  },
  getAll(projectid) {
    console.log(`Get target list from ${projectid} project`);
    return knex
      .select()
      .from('targets')
      .where('project', projectid)
      .then((targets) => {
        if (!targets) return { error: 'There are no targets here' };
        return targets;
      })
      .catch(error => error);
  },
  getOne(id) {
    console.log(`Get target w id ${id}`);
    return knex
      .select()
      .from('targets')
      .where('targets.id', id)
      .then(([target]) => {
        if (!target) return { error: 'Risk does not exist' };
        return { success: true, target };
      });
  },
  updateAchieved(id, data) {
    console.log(`Update ${id} target's achieved value w ${data}`);
    return knex('targets')
      .where('id', id)
      .update('achieved', data);
  },
  delete(id) {
    console.log(`Delete target w id ${id}`);
    return knex('targets')
      .where('id', id)
      .del();
  },
};

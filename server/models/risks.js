const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    description, category, probability, impact, response, project,
  }) {
    console.log(`Add risk ${description}`);
    return knex('risks').insert({
      description,
      category,
      probability,
      impact,
      response,
      project,
    });
  },
  getAll(projectid) {
    console.log(`Get risk list from ${projectid} project`);
    return knex
      .select()
      .from('risks')
      .where('project', projectid)
      .then((risks) => {
        if (!risks) return { error: 'There are no risks here' };
        return risks;
      })
      .catch(error => error);
  },
  getOne(id) {
    console.log(`Get risk w id ${id}`);
    return knex
      .select()
      .from('risks')
      .where('risks.id', id)
      .then(([risk]) => {
        if (!risk) return { error: 'Risk does not exist' };
        return { success: true, risk };
      });
  },
  delete(id) {
    console.log(`Delete risk w id ${id}`);
    return knex('risks')
      .where('id', id)
      .del();
  },
};

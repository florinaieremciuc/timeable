const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    name, topic, date, details, place, extra, team,
  }) {
    console.log(`Add event ${name}`);
    return knex('events').insert({
      name,
      topic,
      date,
      details,
      place,
      extra,
      team,
    });
  },
  getAll(teamid) {
    console.log(`Get events list from ${teamid} team`);
    return knex('events')
      .where('team', teamid)
      .then((events) => {
        if (!events) return { error: 'There are no events here' };
        return events;
      });
  },
  delete(id) {
    console.log(`Delete project w id ${id}`);
    return knex('events')
      .where('id', id)
      .del();
  },
};

const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    name, specs, startDate, endDate, project, user, price,
  }) {
    console.log(`Add device ${name}`);
    return knex('devices').insert({
      name,
      specs,
      startDate,
      endDate,
      project,
      user,
      price,
    });
  },
  getAll(projectid) {
    console.log(`Get device list from ${projectid} project`);
    return knex
      .select()
      .from('devices')
      .where('project', projectid)
      .then((devices) => {
        if (!devices) return { error: 'There are no devices here' };
        return devices;
      })
      .catch(error => error);
  },
  getOne(id) {
    console.log(`Get device w id ${id}`);
    return knex
      .select()
      .from('devices')
      .where('devices.id', id)
      .then(([device]) => {
        if (!device) return { error: 'Device does not exist' };
        return { success: true, device };
      });
  },
  delete(id) {
    console.log(`Delete device w id ${id}`);
    return knex('devices')
      .where('id', id)
      .del();
  },
};

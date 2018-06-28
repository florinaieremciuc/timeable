const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    name, description, deadline, team, startDate,
  }) {
    console.log(`Add project ${name}`);
    return knex('projects').insert({
      name,
      description,
      deadline,
      team,
      startDate,
    });
  },
  getAll(teamid) {
    console.log(`Get projects list from ${teamid} team`);
    return knex('projects')
      .where('team', teamid)
      .then((projects) => {
        if (!projects) return { error: 'There are no projects here' };
        return projects;
      });
  },
  getUserProjects(userId) {
    console.log(`Get user's ${userId} projects list`);
    return knex
      .select(
        'projects.id',
        'projects.name',
        'startDate',
        'deadline',
        'status',
        'projects.description',
        'estimate',
        'priority',
        'projects.team',
      )
      .from('projects')
      .innerJoin('tasks', 'projects.id', 'tasks.project')
      .innerJoin('users_tasks', 'users_tasks.task_id', 'tasks.id')
      .where('users_tasks.user_id', userId)
      .groupBy('projects.name');
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

const knex = require('knex')(require('../knexfile'));

module.exports = {
  create({
    name, description, estimate, priority, status, project,
  }) {
    console.log(`Add task ${name}`);
    return knex('tasks').insert({
      name,
      description,
      estimate,
      priority,
      status,
      project,
    });
  },
  getAll(projectid) {
    console.log(`Get task list from ${projectid} project`);
    return knex('tasks')
      .where('project', projectid)
      .then((tasks) => {
        if (!tasks) return { error: 'There are no tasks here' };
        return tasks;
      });
  },
  getAssigned() {
    console.log('Get tasks that have been assigned to anyone');
    return knex('tasks')
      .whereNotNull('asignee')
      .then((tasks) => {
        if (!tasks) return { error: 'No tasks assigned' };
        return tasks;
      });
  },
  getUnassigned() {
    console.log('Get tasks that have not been assigned to ppl');
    return knex('tasks')
      .whereNull('asignee')
      .then((tasks) => {
        if (!tasks) return { error: 'No tasks assigned' };
        return tasks;
      });
  },
  getOne(id) {
    console.log(`Get task w id ${id}`);
    return knex('tasks')
      .where('id', id)
      .then(([task]) => {
        if (!task) return { error: 'Task does not exist' };
        return { success: true, task };
      });
  },
  addAssignee(id, assignee) {
    console.log(`Updating task having id ${id} w assignee ${assignee}`);
    return knex('tasks')
      .where('id', id)
      .update({
        assignee,
      });
  },
  addDuration(id, duration) {
    console.log(`Updating task having id ${id} w duration ${duration}`);
    return knex('tasks')
      .where('id', id)
      .update({
        duration,
      });
  },
  changeStatus(id, status) {
    console.log(`Updating task having id ${id} w status ${status}`);
    return knex('tasks')
      .where('id', id)
      .update({
        status,
      });
  },
  changePriority(id, priority) {
    console.log(`Updating task having id ${id} w priority ${priority}`);
    return knex('tasks')
      .where('id', id)
      .update({
        priority,
      });
  },
  delete(id) {
    console.log(`Delete task w id ${id}`);
    return knex('tasks')
      .where('id', id)
      .del();
  },
};

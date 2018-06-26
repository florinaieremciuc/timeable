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
      })
      .catch(error => error);
  },
  getAssigned(teamid) {
    console.log(`Get tasks that have been assigned to anyone, from team ${teamid}`);
    return knex
      .select(
        'tasks.id',
        'name',
        'duration',
        'description',
        'status',
        'priority',
        'project',
        'estimate',
        'user_id',
        'username',
        'first_name',
        'last_name',
        'role',
      )
      .from('tasks')
      .innerJoin('users_tasks', 'tasks.id', 'users_tasks.task_id')
      .innerJoin('users', 'users_tasks.user_id', 'users.id')
      .where('users.team', teamid)
      .then((tasks) => {
        if (!tasks || tasks.length === 0) return { error: 'No tasks assigned' };
        return tasks;
      })
      .catch(error => error);
  },
  getUnassigned(teamid) {
    console.log(`Get unassigned tasks from team having id ${teamid}`);
    const subQuery = knex.select('task_id').from('users_tasks');
    return knex('tasks')
      .innerJoin('projects', 'tasks.projects', 'projects.id')
      .where('projects.team', teamid)
      .andWhere('tasks.id', 'not in', subQuery)
      .then((tasks) => {
        if (!tasks) return { error: 'No unassigned tasks' };
        return tasks;
      });
  },
  getOne(id) {
    console.log(`Get task w id ${id}`);
    return knex
      .select(
        'tasks.id',
        'tasks.name',
        'tasks.description',
        'status',
        'priority',
        'estimate',
        'projects.id',
      )
      .from('tasks')
      .where('tasks.id', id)
      .then(([task]) => {
        if (!task) return { error: 'Task does not exist' };
        return { success: true, task };
      });
  },
  addAssignee(id, assignee) {
    console.log(`Add entry in users_tasks for task having id ${id} w assignee ${assignee}`);
    return knex('users_tasks').insert({
      user_id: assignee,
      task_id: id,
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

import config from './../config';

/**
 * Call API to create task.
 * @param {String} name
 * @param {String} description
 * @param {String} deadline
 * @param {Number} team
 */
export const createTask = (name, description, estimate, priority, status, project) => {
  const params = {
    name,
    description,
    estimate,
    priority,
    status,
    project,
  };
  return fetch(`${config.API_URL}/tasks/add_task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to get a projects's tasks.
 * @param {Number} projectid
 */
export const getTasks = projectid =>
  fetch(`${config.API_URL}/tasks/${projectid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to get a user's tasks.
 * @param {Number} userid
 */
export const getAssignedTasks = userid =>
  fetch(`${config.API_URL}/tasks/${userid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to get unassigned tasks.
 */
export const getUnassignedTasks = () =>
  fetch(`${config.API_URL}/tasks/not_assigned`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const deleteTask = id =>
  fetch(`${config.API_URL}/tasks/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

/**
 * Call API to update task assignee.
 * @param {number} id
 * @param {number} assignee - userid
 */
export const updateAssignee = (id, assignee) => {
  const params = {
    id,
    assignee,
  };
  return fetch(`${config.API_URL}/tasks/update/assignee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response);
};

/**
 * Call API to update task status.
 * @param {number} id
 * @param {string} status
 */
export const updateStatus = (id, status) => {
  const params = {
    id,
    status,
  };
  return fetch(`${config.API_URL}/tasks/update/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to update task duration.
 * @param {number} id
 * @param {number} assignee - userid
 */
export const updateDuration = (id, duration) => {
  const params = {
    id,
    duration,
  };
  return fetch(`${config.API_URL}/tasks/update/duration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

export default {
  createTask,
  getTasks,
  deleteTask,
  updateAssignee,
  updateStatus,
  updateDuration,
};

import config from './../config';

/**
 * Call API to create user.
 * @param {String} username
 * @param {String} password
 * @param {String} first name
 * @param {String} last name
 * @param {String} email address
 * @param {String} phone number
 * @param {String} role
 */
export const registerUser = (
  username,
  password,
  first_name,
  last_name,
  email,
  phone,
  role,
  team,
) => {
  const params = {
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
    role,
    team,
  };

  return fetch(`${config.API_URL}/users/create_user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to authenticate user.
 * @param {String} username
 * @param {String} password
 * @param {Number} team
 */
export const signInUser = (username, password, team) => {
  const params = { username, password, team };
  return fetch(`${config.API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to create team.
 * @param {String} name
 */
export const createTeam = (name) => {
  const params = { name };
  return fetch(`${config.API_URL}/teams/create_team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to send invites to team members.
 * @param {Number} team - id
 * @param {String} teamLead - team lead name
 * @param {Array} members - array of members: {email, role}
 */
export const addMembers = (team, teamLead, members) => {
  const params = { team, teamLead, members };
  return fetch(`${config.API_URL}/teams/add_members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
};

/**
 * Call API to get teams.
 */
export const getTeams = () =>
  fetch(`${config.API_URL}/teams/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to create project.
 * @param {String} name
 * @param {String} description
 * @param {String} deadline
 * @param {Number} team
 */
export const createProject = (name, description, deadline, team) => {
  const params = {
    name,
    description,
    deadline,
    team,
  };
  return fetch(`${config.API_URL}/projects/create_project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to get a team's projects.
 * @param {Number} teamid
 */
export const getProjects = teamid =>
  fetch(`${config.API_URL}/projects/${teamid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const deleteProject = id =>
  fetch(`${config.API_URL}/projects/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

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
  }).then(response => response.json());
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
  signInUser,
  registerUser,
  createTeam,
  getTeams,
  createProject,
  getProjects,
  deleteProject,
  createTask,
  getTasks,
  deleteTask,
  updateAssignee,
  updateStatus,
  updateDuration,
};

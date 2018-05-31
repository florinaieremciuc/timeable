import config from './../config';

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

export default {
  createProject,
  getProjects,
  deleteProject,
};

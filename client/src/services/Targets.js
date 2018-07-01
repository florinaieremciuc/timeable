import config from './../config';

/**
 * Call API to create target.
 * @param {String} description
 * @param {String} achieved
 * @param {Number} project
 */
export const createTarget = (description, achieved, project) => {
  const params = {
    description,
    achieved,
    project,
  };
  return fetch(`${config.API_URL}/targets/add_target`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(res => res.json());
};

/**
 * Call API to get a projects's targets.
 * @param {Number} projectid
 */
export const getTargets = projectid =>
  fetch(`${config.API_URL}/targets/${projectid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const updateTarget = (id, data) =>
  fetch(`${config.API_URL}/targets/update/${id}/${data}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const deleteTarget = id =>
  fetch(`${config.API_URL}/targets/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

export default {
  createTarget,
  getTargets,
  updateTarget,
  deleteTarget,
};

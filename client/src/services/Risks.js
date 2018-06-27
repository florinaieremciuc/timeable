import config from './../config';

/**
 * Call API to create risk.
 * @param {String} description
 * @param {String} category
 * @param {Number} probability
 * @param {Number} impact
 * @param {String} response
 * @param {Number} project
 */
export const createRisk = (description, category, probability, impact, response, project) => {
  const params = {
    description,
    category,
    probability,
    impact,
    response,
    project,
  };
  return fetch(`${config.API_URL}/risks/add_risk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(res => res.json());
};

/**
 * Call API to get a projects's risks.
 * @param {Number} projectid
 */
export const getRisks = projectid =>
  fetch(`${config.API_URL}/risks/${projectid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const deleteRisk = id =>
  fetch(`${config.API_URL}/risks/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

export default {
  createRisk,
  getRisks,
  deleteRisk,
};

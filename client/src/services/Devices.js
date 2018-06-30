import config from './../config';

/**
 * Call API to create device.
 * @param {String} name
 * @param {String} specs
 * @param {Number} startDate
 * @param {Number} endDate
 * @param {String} project
 * @param {Number} user
 */
export const createDevice = (name, specs, startDate, endDate, project, user, price) => {
  const params = {
    name,
    specs,
    startDate,
    endDate,
    project,
    user,
    price,
  };
  return fetch(`${config.API_URL}/devices/add_device`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(res => res.json());
};

/**
 * Call API to get a projects's devices.
 * @param {Number} projectid
 */
export const getDevices = projectid =>
  fetch(`${config.API_URL}/devices/${projectid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a project.
 * @param {Number} id
 */
export const deleteDevice = id =>
  fetch(`${config.API_URL}/devices/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

export default {
  createDevice,
  getDevices,
  deleteDevice,
};

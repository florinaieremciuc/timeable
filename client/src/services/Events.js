import config from './../config';

/**
 * Call API to create event.
 * @param {String} name
 * @param {String} topic
 * @param {String} date
 * @param {String} details
 * @param {String} place
 * @param {String} extra
 * @param {Number} team
 */
export const createEvent = (name, topic, date, details, place, extra, team) => {
  const params = {
    name,
    topic,
    date,
    details,
    place,
    extra,
    team,
  };
  return fetch(`${config.API_URL}/events/create_event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

/**
 * Call API to get a team's events.
 * @param {Number} teamid
 */
export const getEvents = teamid =>
  fetch(`${config.API_URL}/events/team/${teamid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to delete a event.
 * @param {Number} id
 */
export const deleteEvent = id =>
  fetch(`${config.API_URL}/events/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response);

export default {
  createEvent,
  getEvents,
  deleteEvent,
};

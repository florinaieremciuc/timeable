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
 * Call API to get team members.
 * @param {Number} teamid
 */
export const getMembers = teamid =>
  fetch(`${config.API_URL}/users/team/${teamid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

/**
 * Call API to get user.
 * @param {Number} id
 */
export const getUser = id =>
  fetch(`${config.API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

export default {
  signInUser,
  registerUser,
  getMembers,
  getUser,
};

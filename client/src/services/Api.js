import config from "./../config";

/**
 * Call API to create user.
 * @param {String} username
 * @param {String} password
 * @param {String} first name
 * @param {String} last name
 * @param {String} email address
 * @param {String} phone number
 */
export const registerUser = (
  username,
  password,
  firstName,
  lastName,
  email,
  phone
) => {
  const params = { username, password, firstName, lastName, email, phone };

  return fetch(`${config.API_URL}/users/create_user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  }).then(response => console.log("RESPONSE REGISTER", response));
  // }).then(response => response.json());
};

/**
 * Call API to authenticate user.
 * @param {String} username
 * @param {String} password
 */
export const signInUser = (username, password) => {
  const params = { username, password };
  console.log("API");
  return fetch(`${config.API_URL}/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-control-allow-origin": config.API_URL,
      "Access-Control-Allow-Credentials": "true"
    },
    body: JSON.stringify(params)
  }).then(response => console.log("RESPONSE LOGIN", response));
  // }).then(response => response.json());
};

/**
 * Call API to get a new token.
 * @param {String} refreshToken
 */
export const getNewToken = (refreshToken, token) => {
  const params = {
    refresh_token: refreshToken
  };

  return fetch(`${config.API_URL}/jwt-rest/auth/refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      Auth: `Bearer ${String(token)}` // TO DO: rm token
    },
    body: JSON.stringify(params)
  }).then(response => response.json());
};

/**
 * Call API to reset user's password.
 * @param {String} username
 * @param {String} oldPassword
 * @param {String} newPassword
 * @param {String} token
 */
export const resetPassword = (username, oldPassword, newPassword, token) => {
  const params = {
    username,
    oldPassword,
    newPassword
  };

  return fetch(`${config.API_URL}/jwt-rest/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      Auth: `Bearer ${token}`
    },
    body: JSON.stringify(params)
  }).then(response => response.json());
};

/**
 * Call API to get main menu
 * @param {String} token
 */
export const getMenu = token =>
  fetch(`${config.API_URL}/jwt-rest/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      Auth: `Bearer ${token}`
    }
  }).then(response => response.json());

/**
 * Call API to get program.
 *
 * @param {String} token
 * @param {Number} id
 * @return {Promise}
 */
export const getProgram = (token, id) =>
  fetch(`${config.API_URL}/jwt-rest/programs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      Auth: `Bearer ${token}`
    }
  }).then(response => response.json());

/**
 * Call API to get a post.
 *
 * @param {String} token
 * @param {Number} id
 * @return {Promise}
 */
export const getPost = (token, id) =>
  fetch(`${config.API_URL}/jwt-rest/page/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.API_KEY,
      Auth: `Bearer ${token}`
    }
  }).then(response => response.json());

export default {
  signInUser,
  getNewToken,
  resetPassword,
  getMenu,
  getProgram
};

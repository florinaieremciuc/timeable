// ACTIONS ----------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// ACTION CREATORS ----------------------------------------
export const loginAttempt = (username, password) => ({
  type: LOGIN_REQUEST,
  username,
  password,
});
export const loginSuccess = (
  id,
  username,
  firstname,
  lastname,
  email,
  phone,
  role,
  team,
  success,
) => ({
  type: LOGIN_SUCCESS,
  id,
  username,
  firstname,
  lastname,
  email,
  phone,
  role,
  team,
  success,
});
export const loginFailure = (error, message) => ({
  type: LOGIN_FAILURE,
  error,
  message,
});

export const logout = () => ({ type: LOGOUT });

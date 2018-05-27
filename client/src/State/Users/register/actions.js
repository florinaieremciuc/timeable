// ACTIONS ----------------------------------------
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// ACTION CREATORS ----------------------------------------
export const registerAttempt = (
  username,
  password,
  firstname,
  lastname,
  email,
  phone,
  role,
  team,
) => ({
  type: REGISTER_REQUEST,
  username,
  password,
  firstname,
  lastname,
  email,
  phone,
  role,
  team,
});
export const registerSuccess = success => ({
  type: REGISTER_SUCCESS,
  success,
});
export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  error,
});

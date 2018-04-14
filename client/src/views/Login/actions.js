// ACTIONS ----------------------------------------
export const FETCH_LOGIN_REQUEST = "FETCH_LOGIN_REQUEST";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// ACTION CREATORS ----------------------------------------
export const loginAttempt = (username, password) => ({
  type: FETCH_LOGIN_REQUEST,
  username,
  password
});
export const loginSuccess = (
  id,
  username,
  firstname,
  lastname,
  email,
  phone,
  role,
  success
) => ({
  type: FETCH_LOGIN_SUCCESS,
  id,
  username,
  firstname,
  lastname,
  email,
  phone,
  role,
  success
});
export const loginFailure = errorMessage => ({
  type: FETCH_LOGIN_FAILURE,
  errorMessage
});

export const logout = () => ({ type: LOGOUT });

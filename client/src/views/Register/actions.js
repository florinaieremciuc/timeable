// ACTIONS ----------------------------------------
export const FETCH_REGISTER_REQUEST = "FETCH_REGISTER_REQUEST";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";
export const FETCH_REGISTER_FAILURE = "FETCH_REGISTER_FAILURE";

// ACTION CREATORS ----------------------------------------
export const registerAttempt = (
  username,
  password,
  firstname,
  lastname,
  email,
  phone,
  role,
  team
) => ({
  type: FETCH_REGISTER_REQUEST,
  username,
  password,
  firstname,
  lastname,
  email,
  phone,
  role,
  team
});
export const registerSuccess = success => ({
  type: FETCH_REGISTER_SUCCESS,
  success
});
export const registerFailure = error => ({
  type: FETCH_REGISTER_FAILURE,
  error
});

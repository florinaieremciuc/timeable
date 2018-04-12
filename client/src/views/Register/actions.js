// ACTIONS ----------------------------------------
export const FETCH_REGISTER_REQUEST = "FETCH_REGISTER_REQUEST";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";
export const FETCH_REGISTER_FAILURE = "FETCH_REGISTER_FAILURE";

// ACTION CREATORS ----------------------------------------
export const registerAttempt = (
  username,
  password,
  firstName,
  lastName,
  email,
  phone
) => ({
  type: FETCH_REGISTER_REQUEST,
  username,
  password,
  firstName,
  lastName,
  email,
  phone
});
export const registerSuccess = successMessage => ({
  type: FETCH_REGISTER_SUCCESS,
  successMessage
});
export const registerFailure = errorMessage => ({
  type: FETCH_REGISTER_FAILURE,
  errorMessage
});

// ACTIONS ----------------------------------------
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getUserAttempt = id => ({
  type: GET_USER_REQUEST,
  id,
});
export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user,
});
export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error,
});

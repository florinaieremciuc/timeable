// ACTIONS ----------------------------------------
export const FETCH_CREATE_PROJECT_REQUEST = 'FETCH_CREATE_PROJECT_REQUEST';
export const FETCH_CREATE_PROJECT_SUCCESS = 'FETCH_CREATE_PROJECT_SUCCESS';
export const FETCH_CREATE_PROJECT_FAILURE = 'FETCH_CREATE_PROJECT_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createProjectAttempt = (name, description, deadline, team) => ({
  type: FETCH_CREATE_PROJECT_REQUEST,
  name,
  description,
  deadline,
  team,
});
export const createProjectSuccess = (id, name, description, deadline, team) => ({
  type: FETCH_CREATE_PROJECT_SUCCESS,
  id,
  name,
  description,
  deadline,
  team,
});
export const createProjectFailure = error => ({
  type: FETCH_CREATE_PROJECT_FAILURE,
  error,
});

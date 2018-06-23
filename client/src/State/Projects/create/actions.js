// ACTIONS ----------------------------------------
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createProjectAttempt = (name, description, deadline, team, startDate) => ({
  type: CREATE_PROJECT_REQUEST,
  name,
  description,
  deadline,
  team,
  startDate,
});
export const createProjectSuccess = (id, name, description, deadline, team, startDate) => ({
  type: CREATE_PROJECT_SUCCESS,
  id,
  name,
  description,
  deadline,
  team,
  startDate,
});
export const createProjectFailure = error => ({
  type: CREATE_PROJECT_FAILURE,
  error,
});

// ACTIONS ----------------------------------------
export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';
export const GET_USER_PROJECTS_REQUEST = 'GET_USER_PROJECTS_REQUEST';

// ACTION CREATORS ----------------------------------------
export const getProjectsAttempt = teamid => ({
  type: GET_PROJECTS_REQUEST,
  teamid,
});
export const getUsersProjectsAttempt = userId => ({
  type: GET_USER_PROJECTS_REQUEST,
  userId,
});
export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  projects,
});
export const getProjectsFailure = error => ({
  type: GET_PROJECTS_FAILURE,
  error,
});

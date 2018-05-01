// ACTIONS ----------------------------------------
export const FETCH_GET_PROJECTS_REQUEST = 'FETCH_GET_PROJECTS_REQUEST';
export const FETCH_GET_PROJECTS_SUCCESS = 'FETCH_GET_PROJECTS_SUCCESS';
export const FETCH_GET_PROJECTS_FAILURE = 'FETCH_GET_PROJECTS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getProjectsAttempt = () => ({
  type: FETCH_GET_PROJECTS_REQUEST,
});
export const getProjectsSuccess = projects => ({
  type: FETCH_GET_PROJECTS_SUCCESS,
  projects,
});
export const getProjectsFailure = error => ({
  type: FETCH_GET_PROJECTS_FAILURE,
  error,
});

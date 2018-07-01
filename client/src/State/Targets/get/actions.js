// ACTIONS ----------------------------------------
export const GET_TARGETS_REQUEST = 'GET_TARGETS_REQUEST';
export const GET_TARGETS_SUCCESS = 'GET_TARGETS_SUCCESS';
export const GET_TARGETS_FAILURE = 'GET_TARGETS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getTargetsAttempt = projectid => ({
  type: GET_TARGETS_REQUEST,
  projectid,
});
export const getTargetsSuccess = targets => ({
  type: GET_TARGETS_SUCCESS,
  targets,
});
export const getTargetsFailure = error => ({
  type: GET_TARGETS_FAILURE,
  error,
});

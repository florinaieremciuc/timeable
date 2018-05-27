// ACTIONS ----------------------------------------
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteProjectAttempt = id => ({
  type: DELETE_PROJECT_REQUEST,
  id,
});
export const deleteProjectSuccess = success => ({
  type: DELETE_PROJECT_SUCCESS,
  success,
});
export const deleteProjectFailure = error => ({
  type: DELETE_PROJECT_FAILURE,
  error,
});

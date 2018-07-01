// ACTIONS ----------------------------------------
export const DELETE_TARGET_REQUEST = 'DELETE_TARGET_REQUEST';
export const DELETE_TARGET_SUCCESS = 'DELETE_TARGET_SUCCESS';
export const DELETE_TARGET_FAILURE = 'DELETE_TARGET_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteTargetAttempt = id => ({
  type: DELETE_TARGET_REQUEST,
  id,
});
export const deleteTargetSuccess = success => ({
  type: DELETE_TARGET_SUCCESS,
  success,
});
export const deleteTargetFailure = error => ({
  type: DELETE_TARGET_FAILURE,
  error,
});

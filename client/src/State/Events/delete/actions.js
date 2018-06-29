// ACTIONS ----------------------------------------
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteEventAttempt = id => ({
  type: DELETE_EVENT_REQUEST,
  id,
});
export const deleteEventSuccess = success => ({
  type: DELETE_EVENT_SUCCESS,
  success,
});
export const deleteEventFailure = error => ({
  type: DELETE_EVENT_FAILURE,
  error,
});

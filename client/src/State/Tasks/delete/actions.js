// ACTIONS ----------------------------------------
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteTaskAttempt = id => ({
  type: DELETE_TASK_REQUEST,
  id,
});
export const deleteTaskSuccess = success => ({
  type: DELETE_TASK_SUCCESS,
  success,
});
export const deleteTaskFailure = error => ({
  type: DELETE_TASK_FAILURE,
  error,
});

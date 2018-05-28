// ACTIONS ----------------------------------------
export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getTasksAttempt = projectid => ({
  type: GET_TASKS_REQUEST,
  projectid,
});
export const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});
export const getTasksFailure = error => ({
  type: GET_TASKS_FAILURE,
  error,
});

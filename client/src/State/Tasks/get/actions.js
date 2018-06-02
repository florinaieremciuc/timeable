// ACTIONS ----------------------------------------
// project tasks
export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';
// assigned tasks
export const GET_ASSIGNED_TASKS_REQUEST = 'GET_ASSIGNED_TASKS_REQUEST';
export const GET_ASSIGNED_TASKS_SUCCESS = 'GET_ASSIGNED_TASKS_SUCCESS';
export const GET_ASSIGNED_TASKS_FAILURE = 'GET_ASSIGNED_TASKS_FAILURE';

// ACTION CREATORS ----------------------------------------
// project tasks
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
// assigned tasks
export const getAssignedTasksAttempt = userid => ({
  type: GET_TASKS_REQUEST,
  userid,
});
export const getAssignedTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});
export const getAssignedTasksFailure = error => ({
  type: GET_TASKS_FAILURE,
  error,
});

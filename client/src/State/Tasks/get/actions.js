// ACTIONS ----------------------------------------
// project tasks
export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';
// assigned tasks
export const GET_ASSIGNED_TASKS_REQUEST = 'GET_ASSIGNED_TASKS_REQUEST';
export const GET_ASSIGNED_TASKS_SUCCESS = 'GET_ASSIGNED_TASKS_SUCCESS';
export const GET_ASSIGNED_TASKS_FAILURE = 'GET_ASSIGNED_TASKS_FAILURE';
// assigned tasks to user x on projects y
export const GET_USERS_TASKS_PER_PROJECT_REQUEST = 'GET_USERS_TASKS_PER_PROJECT_REQUEST';
export const GET_USERS_TASKS_PER_PROJECT_SUCCESS = 'GET_USERS_TASKS_PER_PROJECT_SUCCESS';
export const GET_USERS_TASKS_PER_PROJECT_FAILURE = 'GET_USERS_TASKS_PER_PROJECT_FAILURE';

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
export const getAssignedTasksAttempt = teamid => ({
  type: GET_ASSIGNED_TASKS_REQUEST,
  teamid,
});
export const getAssignedTasksSuccess = tasks => ({
  type: GET_ASSIGNED_TASKS_SUCCESS,
  tasks,
});
export const getAssignedTasksFailure = error => ({
  type: GET_ASSIGNED_TASKS_FAILURE,
  error,
});
// assigned tasks to user x on project y
export const getUsersTasksperProjectAttempt = (user, project) => ({
  type: GET_USERS_TASKS_PER_PROJECT_REQUEST,
  user,
  project,
});
export const getUsersTasksperProjectSuccess = tasks => ({
  type: GET_USERS_TASKS_PER_PROJECT_SUCCESS,
  tasks,
});
export const getUsersTasksperProjectFailure = error => ({
  type: GET_USERS_TASKS_PER_PROJECT_FAILURE,
  error,
});

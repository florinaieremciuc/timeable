// ACTIONS ----------------------------------------
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createTaskAttempt = (name, description, estimate, priority, status, project) => ({
  type: CREATE_TASK_REQUEST,
  name,
  description,
  estimate,
  priority,
  status,
  project,
});
export const createTaskSuccess = (id, name, description, estimate, priority, status, project) => ({
  type: CREATE_TASK_SUCCESS,
  id,
  name,
  description,
  estimate,
  priority,
  status,
  project,
});
export const createTaskFailure = error => ({
  type: CREATE_TASK_FAILURE,
  error,
});

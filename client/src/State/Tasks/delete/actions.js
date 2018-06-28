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

// DELETE ASSIGNEE
export const DELETE_ASSIGNEE_REQUEST = 'DELETE_ASSIGNEE_REQUEST';
export const DELETE_ASSIGNEE_SUCCESS = 'DELETE_ASSIGNEE_SUCCESS';
export const DELETE_ASSIGNEE_FAILURE = 'DELETE_ASSIGNEE_FAILURE';

export const deleteAssigneeAttempt = (task, assignee) => ({
  type: DELETE_ASSIGNEE_REQUEST,
  task,
  assignee,
});
export const deleteAssigneeSuccess = success => ({
  type: DELETE_ASSIGNEE_SUCCESS,
  success,
});
export const deleteAssigneeFailure = error => ({
  type: DELETE_ASSIGNEE_FAILURE,
  error,
});

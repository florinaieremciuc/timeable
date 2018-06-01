// UPDATE ASSIGNEE
export const UPDATE_ASSIGNEE_REQUEST = 'UPDATE_ASSIGNEE_REQUEST';
export const UPDATE_ASSIGNEE_SUCCESS = 'UPDATE_ASSIGNEE_SUCCESS';
export const UPDATE_ASSIGNEE_FAILURE = 'UPDATE_ASSIGNEE_FAILURE';

export const updateAssigneeAttempt = (id, assignee) => ({
  type: UPDATE_ASSIGNEE_REQUEST,
  id,
  assignee,
});
export const updateAssigneeSuccess = success => ({
  type: UPDATE_ASSIGNEE_SUCCESS,
  success,
});
export const updateAssigneeFailure = error => ({
  type: UPDATE_ASSIGNEE_FAILURE,
  error,
});

// UPDATE STATUS
export const UPDATE_STATUS_REQUEST = 'UPDATE_STATUS_REQUEST';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';

export const updateStatusAttempt = (id, status) => ({
  type: UPDATE_ASSIGNEE_REQUEST,
  id,
  status,
});
export const updateStatusSuccess = success => ({
  type: UPDATE_ASSIGNEE_SUCCESS,
  success,
});
export const updateStatusFailure = error => ({
  type: UPDATE_ASSIGNEE_FAILURE,
  error,
});

// UPDATE DURATION
export const UPDATE_DURATION_REQUEST = 'UPDATE_DURATION_REQUEST';
export const UPDATE_DURATION_SUCCESS = 'UPDATE_DURATION_SUCCESS';
export const UPDATE_DURATION_FAILURE = 'UPDATE_DURATION_FAILURE';

export const updateDurationAttempt = (id, duration) => ({
  type: UPDATE_ASSIGNEE_REQUEST,
  id,
  duration,
});
export const updateDurationSuccess = success => ({
  type: UPDATE_ASSIGNEE_SUCCESS,
  success,
});
export const updateDurationFailure = error => ({
  type: UPDATE_ASSIGNEE_FAILURE,
  error,
});

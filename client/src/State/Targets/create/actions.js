// ACTIONS ----------------------------------------
export const CREATE_TARGET_REQUEST = 'CREATE_TARGET_REQUEST';
export const CREATE_TARGET_SUCCESS = 'CREATE_TARGET_SUCCESS';
export const CREATE_TARGET_FAILURE = 'CREATE_TARGET_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createTargetAttempt = (description, achieved, project) => ({
  type: CREATE_TARGET_REQUEST,
  description,
  achieved,
  project,
});
export const createTargetSuccess = (id, description, achieved, project) => ({
  type: CREATE_TARGET_SUCCESS,
  id,
  description,
  achieved,
  project,
});
export const createTargetFailure = error => ({
  type: CREATE_TARGET_FAILURE,
  error,
});

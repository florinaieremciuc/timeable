// UPDATE TARGET
export const UPDATE_TARGET_REQUEST = 'UPDATE_TARGET_REQUEST';
export const UPDATE_TARGET_SUCCESS = 'UPDATE_TARGET_SUCCESS';
export const UPDATE_TARGET_FAILURE = 'UPDATE_TARGET_FAILURE';

export const updateTargetAttempt = (id, data) => ({
  type: UPDATE_TARGET_REQUEST,
  id,
  data,
});
export const updateTargetSuccess = success => ({
  type: UPDATE_TARGET_SUCCESS,
  success,
});
export const updateTargetFailure = error => ({
  type: UPDATE_TARGET_FAILURE,
  error,
});

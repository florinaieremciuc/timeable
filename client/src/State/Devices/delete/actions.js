// ACTIONS ----------------------------------------
export const DELETE_DEVICE_REQUEST = 'DELETE_DEVICE_REQUEST';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
export const DELETE_DEVICE_FAILURE = 'DELETE_DEVICE_FAILURE';

// ACTION CREATORS ----------------------------------------
export const deleteDeviceAttempt = id => ({
  type: DELETE_DEVICE_REQUEST,
  id,
});
export const deleteDeviceSuccess = success => ({
  type: DELETE_DEVICE_SUCCESS,
  success,
});
export const deleteDeviceFailure = error => ({
  type: DELETE_DEVICE_FAILURE,
  error,
});

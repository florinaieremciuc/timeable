// ACTIONS ----------------------------------------
export const GET_DEVICES_REQUEST = 'GET_DEVICES_REQUEST';
export const GET_DEVICES_SUCCESS = 'GET_DEVICES_SUCCESS';
export const GET_DEVICES_FAILURE = 'GET_DEVICES_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getDevicesAttempt = projectid => ({
  type: GET_DEVICES_REQUEST,
  projectid,
});
export const getDevicesSuccess = devices => ({
  type: GET_DEVICES_SUCCESS,
  devices,
});
export const getDevicesFailure = error => ({
  type: GET_DEVICES_FAILURE,
  error,
});

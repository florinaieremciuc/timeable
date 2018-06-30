// ACTIONS ----------------------------------------
export const CREATE_DEVICE_REQUEST = 'CREATE_DEVICE_REQUEST';
export const CREATE_DEVICE_SUCCESS = 'CREATE_DEVICE_SUCCESS';
export const CREATE_DEVICE_FAILURE = 'CREATE_DEVICE_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createDeviceAttempt = (name, specs, startDate, endDate, project, user, price) => ({
  type: CREATE_DEVICE_REQUEST,
  name,
  specs,
  startDate,
  endDate,
  project,
  user,
  price,
});
export const createDeviceSuccess = (id, name, specs, startDate, endDate, project, user, price) => ({
  type: CREATE_DEVICE_SUCCESS,
  id,
  name,
  specs,
  startDate,
  endDate,
  project,
  user,
  price,
});
export const createDeviceFailure = error => ({
  type: CREATE_DEVICE_FAILURE,
  error,
});

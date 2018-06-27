// ACTIONS ----------------------------------------
export const GET_RISKS_REQUEST = 'GET_RISKS_REQUEST';
export const GET_RISKS_SUCCESS = 'GET_RISKS_SUCCESS';
export const GET_RISKS_FAILURE = 'GET_RISKS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getRisksAttempt = projectid => ({
  type: GET_RISKS_REQUEST,
  projectid,
});
export const getRisksSuccess = risks => ({
  type: GET_RISKS_SUCCESS,
  risks,
});
export const getRisksFailure = error => ({
  type: GET_RISKS_FAILURE,
  error,
});

// ACTIONS ----------------------------------------
export const GET_TEAMS_REQUEST = 'GET_TEAMS_REQUEST';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getTeamsAttempt = () => ({
  type: GET_TEAMS_REQUEST,
});
export const getTeamsSuccess = teams => ({
  type: GET_TEAMS_SUCCESS,
  teams,
});
export const getTeamsFailure = error => ({
  type: GET_TEAMS_FAILURE,
  error,
});

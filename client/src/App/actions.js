// ACTIONS ----------------------------------------
export const FETCH_GET_TEAMS_REQUEST = "FETCH_GET_TEAMS_REQUEST";
export const FETCH_GET_TEAMS_SUCCESS = "FETCH_GET_TEAMS_SUCCESS";
export const FETCH_GET_TEAMS_FAILURE = "FETCH_GET_TEAMS_FAILURE";

// ACTION CREATORS ----------------------------------------
export const getTeamsAttempt = () => ({
  type: FETCH_GET_TEAMS_REQUEST
});
export const getTeamsSuccess = teams => ({
  type: FETCH_GET_TEAMS_SUCCESS,
  teams
});
export const getTeamsFailure = error => ({
  type: FETCH_GET_TEAMS_FAILURE,
  error
});

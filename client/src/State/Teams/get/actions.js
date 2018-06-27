// ACTIONS ----------------------------------------
export const GET_TEAM_REQUEST = 'GET_TEAM_REQUEST';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const GET_TEAM_FAILURE = 'GET_TEAM_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getTeamAttempt = teamid => ({
  type: GET_TEAM_REQUEST,
  teamid,
});
export const getTeamSuccess = team => ({
  type: GET_TEAM_SUCCESS,
  team,
});
export const getTeamFailure = error => ({
  type: GET_TEAM_FAILURE,
  error,
});

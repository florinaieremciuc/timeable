// ACTIONS ----------------------------------------
export const FETCH_CREATE_TEAM_REQUEST = 'FETCH_CREATE_TEAM_REQUEST';
export const FETCH_CREATE_TEAM_SUCCESS = 'FETCH_CREATE_TEAM_SUCCESS';
export const FETCH_CREATE_TEAM_FAILURE = 'FETCH_CREATE_TEAM_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createTeamAttempt = name => ({
  type: FETCH_CREATE_TEAM_REQUEST,
  name,
});
export const createTeamSuccess = (id, name) => ({
  type: FETCH_CREATE_TEAM_SUCCESS,
  id,
  name,
});
export const createTeamFailure = error => ({
  type: FETCH_CREATE_TEAM_FAILURE,
  error,
});

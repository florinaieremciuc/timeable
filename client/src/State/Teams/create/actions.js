// ACTIONS ----------------------------------------
export const CREATE_TEAM_REQUEST = 'CREATE_TEAM_REQUEST';
export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createTeamAttempt = name => ({
  type: CREATE_TEAM_REQUEST,
  name,
});
export const createTeamSuccess = (id, name) => ({
  type: CREATE_TEAM_SUCCESS,
  id,
  name,
});
export const createTeamFailure = error => ({
  type: CREATE_TEAM_FAILURE,
  error,
});

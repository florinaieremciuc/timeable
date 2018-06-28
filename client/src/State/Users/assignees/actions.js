// ACTIONS ----------------------------------------
export const GET_ASSIGNEES_REQUEST = 'GET_ASSIGNEES_REQUEST';
export const GET_ASSIGNEES_SUCCESS = 'GET_ASSIGNEES_SUCCESS';
export const GET_ASSIGNEES_FAILURE = 'GET_ASSIGNEES_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getAssigneesAttempt = teamid => ({
  type: GET_ASSIGNEES_REQUEST,
  teamid,
});
export const getAssigneesSuccess = assignees => ({
  type: GET_ASSIGNEES_SUCCESS,
  assignees,
});
export const getAssigneesFailure = error => ({
  type: GET_ASSIGNEES_FAILURE,
  error,
});

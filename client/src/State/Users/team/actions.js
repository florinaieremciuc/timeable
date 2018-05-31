// ACTIONS ----------------------------------------
export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getMembersAttempt = teamid => ({
  type: GET_MEMBERS_REQUEST,
  teamid,
});
export const getMembersSuccess = members => ({
  type: GET_MEMBERS_SUCCESS,
  members,
});
export const getMembersFailure = error => ({
  type: GET_MEMBERS_FAILURE,
  error,
});

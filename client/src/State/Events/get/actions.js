// ACTIONS ----------------------------------------
export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

// ACTION CREATORS ----------------------------------------
export const getEventsAttempt = teamid => ({
  type: GET_EVENTS_REQUEST,
  teamid,
});
export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  events,
});
export const getEventsFailure = error => ({
  type: GET_EVENTS_FAILURE,
  error,
});

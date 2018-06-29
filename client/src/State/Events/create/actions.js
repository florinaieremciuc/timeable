// ACTIONS ----------------------------------------
export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

// ACTION CREATORS ----------------------------------------
export const createEventAttempt = (name, topic, date, details, place, extra, team) => ({
  type: CREATE_EVENT_REQUEST,
  name,
  topic,
  date,
  details,
  place,
  extra,
  team,
});
export const createEventSuccess = (id, name, topic, date, details, place, extra, team) => ({
  type: CREATE_EVENT_SUCCESS,
  id,
  name,
  topic,
  date,
  details,
  place,
  extra,
  team,
});
export const createEventFailure = error => ({
  type: CREATE_EVENT_FAILURE,
  error,
});

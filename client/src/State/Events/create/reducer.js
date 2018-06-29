import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const eventPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  extra: PropTypes.string.isRequired,
  team: PropTypes.number.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    name: null,
    topic: null,
    date: null,
    details: null,
    place: null,
    extra: null,
    team: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new event data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_EVENT_REQUEST:
  case types.CREATE_EVENT_SUCCESS: {
    const newEventData = {
      id: action.id,
      name: action.name,
      topic: action.topic,
      date: action.date,
      details: null,
      place: action.place,
      extra: null,
      team: action.team,
    };
    if (action.details) {
      newEventData.details = action.details;
    }
    if (action.extra) {
      newEventData.extra = action.extra;
    }
    return newEventData;
  }
  case types.CREATE_EVENT_FAILURE:
  default:
    return state;
  }
};

/**
 * Reducer for the authenticate attempt status application state.
 * @param {*} state
 * @param {*} action
 */
const sync = (state = INITIAL_STATE.sync, action) => {
  switch (action.type) {
  case types.CREATE_EVENT_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_EVENT_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_EVENT_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get event data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const teamPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {},
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the team application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.GET_TEAM_REQUEST: {
    return state;
  }
  case types.GET_TEAM_SUCCESS: {
    return action.team;
  }
  case types.GET_TEAM_FAILURE:
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
  case types.GET_TEAM_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_TEAM_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_TEAM_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getTeam = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { isNil } from 'lodash';
import * as types from './actions';

export const teamsPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the teams application state.
 * @param {*} state
 * @param {*} action
 */
const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case types.FETCH_GET_TEAMS_REQUEST: {
    return state;
  }
  case types.FETCH_GET_TEAMS_SUCCESS: {
    return action.teams;
  }
  case types.FETCH_GET_TEAMS_FAILURE:
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
  case types.FETCH_GET_TEAMS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.FETCH_GET_TEAMS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.FETCH_GET_TEAMS_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getItems = state => state.items;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  items,
  sync,
});

import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

import * as types from './actions';

export const projectsPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  deadline: PropTypes.string.isRequired,
  team: PropTypes.number.isRequired,
});

export const INITIAL_STATE = Immutable({
  items: [],
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the projects application state.
 * @param {*} state
 * @param {*} action
 */
const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case types.FETCH_GET_PROJECTS_REQUEST: {
    return state;
  }
  case types.FETCH_GET_PROJECTS_SUCCESS: {
    if (Array.isArray(action.projects)) {
      return _.unionBy(state, action.projects, 'id');
    }
    return _.unionBy(state, [action.projects], 'id');
  }
  case types.FETCH_GET_PROJECTS_FAILURE:
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
  case types.FETCH_GET_PROJECTS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.FETCH_GET_PROJECTS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.FETCH_GET_PROJECTS_FAILURE:
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

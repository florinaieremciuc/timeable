import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

import * as types from './actions';
import { LOGOUT } from '../../Users/login/actions';

export const INITIAL_STATE = Immutable({
  items: [],
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the members application state.
 * @param {*} state
 * @param {*} action
 */
const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case types.GET_MEMBERS_REQUEST: {
    return state;
  }
  case types.GET_MEMBERS_SUCCESS: {
    return action.members;
  }
  case types.GET_MEMBERS_FAILURE:
  case LOGOUT:
    return INITIAL_STATE.items;
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
  case types.GET_MEMBERS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_MEMBERS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_MEMBERS_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  case LOGOUT:
    return INITIAL_STATE.sync;
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

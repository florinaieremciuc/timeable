import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

import * as types from './actions';
import { LOGOUT } from '../../Users/login/actions';

export const INITIAL_STATE = Immutable({
  item: {},
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the user application state.
 * @param {*} state
 * @param {*} action
 */
const item = (state = INITIAL_STATE.item, action) => {
  switch (action.type) {
  case types.GET_USER_REQUEST: {
    return state;
  }
  case types.GET_USER_SUCCESS: {
    return action.user;
  }
  case types.GET_USER_FAILURE:
  case LOGOUT:
    return INITIAL_STATE.item;
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
  case types.GET_USER_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_USER_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_USER_FAILURE:
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

export const getItem = state => state.item;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  item,
  sync,
});

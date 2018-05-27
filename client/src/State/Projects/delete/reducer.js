import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the authenticate attempt status application state.
 * @param {*} state
 * @param {*} action
 */
const sync = (state = INITIAL_STATE.sync, action) => {
  switch (action.type) {
  case types.DELETE_PROJECT_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.DELETE_PROJECT_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.DELETE_PROJECT_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  sync,
});

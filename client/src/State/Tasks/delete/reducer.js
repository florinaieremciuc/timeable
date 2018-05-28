import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  sync: {
    attempting: 0,
    error: null,
    success: null,
  },
});

/**
 * Reducer for the authenticate attempt status application state.
 * @param {*} state
 * @param {*} action
 */
const sync = (state = INITIAL_STATE.sync, action) => {
  switch (action.type) {
  case types.DELETE_TASK_REQUEST:
    return {
      attempting: 1,
      error: null,
      success: null,
    };
  case types.DELETE_TASK_SUCCESS:
    return {
      attempting: 0,
      error: null,
      success: action.success,
    };
  case types.DELETE_TASK_FAILURE:
    return {
      attempting: 0,
      error: action.error,
      success: null,
    };
  default:
    return state;
  }
};

export const getError = state => state.sync.error;
export const getSuccess = state => state.sync.success;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  sync,
});

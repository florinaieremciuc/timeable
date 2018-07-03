import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * @param {*} state
 * @param {*} action
 */
const sync = (state = INITIAL_STATE.sync, action) => {
  switch (action.type) {
  case types.UPDATE_TARGET_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.UPDATE_TARGET_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.UPDATE_TARGET_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const isAttemptingTarget = state => state.attempting;
export const getTargetError = state => state.error;

export default sync;

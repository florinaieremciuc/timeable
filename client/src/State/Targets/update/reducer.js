import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  target: {
    attempting: 0,
    error: null,
  },
});

/**
 * @param {*} state
 * @param {*} action
 */
const target = (state = INITIAL_STATE.target, action) => {
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

export const getTargetError = state => state.target.error;
export const isAttemptingTarget = state => state.target.attempting;

export default target;

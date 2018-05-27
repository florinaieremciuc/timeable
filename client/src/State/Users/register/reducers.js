import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  attempting: 0,
  success: null,
  error: null,
});

/**
 * Reducer for the registration attempt status application state.
 * @param {*} state
 * @param {*} action
 */
const registrationsStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.REGISTER_REQUEST:
    return {
      attempting: 1,
      success: null,
      error: null,
    };
  case types.REGISTER_SUCCESS:
    return {
      attempting: 0,
      success: action.success,
      error: null,
    };
  case types.REGISTER_FAILURE:
    return {
      attempting: 0,
      success: null,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getSuccess = state => state.success;
export const getError = state => state.error;
export const isAttempting = state => state.attempting;

export default registrationsStatus;

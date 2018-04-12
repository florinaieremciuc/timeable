import PropTypes from "prop-types";
import { combineReducers } from "redux";
import Immutable from "seamless-immutable";
import { isNil } from "lodash";
import * as types from "./actions";

export const INITIAL_STATE = Immutable({
  attempting: 0,
  successMessage: null,
  errorMessage: null
});

/**
 * Reducer for the registration attempt status application state.
 * @param {*} state
 * @param {*} action
 */
const registrationsStatus = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_REGISTER_REQUEST:
      return {
        attempting: 1,
        successMessage: null,
        errorMessage: null
      };
    case types.FETCH_REGISTER_SUCCESS:
      return {
        attempting: 0,
        successMessage: action.successMessage,
        errorMessage: null
      };
    case types.FETCH_REGISTER_FAILURE:
      return {
        attempting: 0,
        successMessage: null,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export const getSuccess = state => state.successMessage;
export const getError = state => state.errorMessage;
export const isAttempting = state => state.attempting;

export default registrationsStatus;

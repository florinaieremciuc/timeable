import PropTypes from "prop-types";
import { combineReducers } from "redux";
import Immutable from "seamless-immutable";
import { isNil } from "lodash";
import * as types from "./actions";

export const userPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  },
  sync: {
    attempting: 0,
    successMessage: null,
    errorMessage: null
  }
});

/**
 * Reducer for the user data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
    case types.FETCH_LOGIN_REQUEST:
    case types.FETCH_LOGIN_SUCCESS: {
      const userData = {
        id: action.id,
        username: action.username,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phone: action.phone
      };
      return userData;
    }
    case types.FETCH_LOGIN_FAILURE:
    case types.LOGOUT:
      return INITIAL_STATE.data;
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
    case types.FETCH_LOGIN_REQUEST:
      return {
        attempting: 1,
        successMessage: null,
        errorMessage: null
      };
    case types.FETCH_LOGIN_SUCCESS:
      return {
        attempting: 0,
        successMessage: action.successMessage,
        errorMessage: null
      };
    case types.FETCH_LOGIN_FAILURE:
      return {
        attempting: 0,
        successMessage: null,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

/**
 * Check if the user is authenticated.
 * @param {Object} state
 */
export const isAuthenticated = state => {
  if (state.data && state.sync.successMessage && !state.sync.errorMessage) {
    return true;
  }
  return false;
};

/**
 * Get the id, if user is authenticated
 * @param {Object} state
 */
export const getUserId = state => {
  isAuthenticated(state) ? state.data.id : null;
};

/**
 * Get the username, if user is authenticated
 * @param {Object} state
 */
export const getUsername = state => {
  isAuthenticated(state) ? state.data.username : null;
};

/**
 * Get the first name, if the user is authenticated
 * @param {Object} state
 */
export const getFirstName = state => {
  isAuthenticated(state) ? state.data.firstName : null;
};

/**
 * Get the name, if the user is authenticated
 * @param {Object} state
 */
export const getLastName = state =>
  isAuthenticated(state) ? state.data.lastName : null;

/**
 * Get the email address, if the user is authenticated
 * @param {Object} state
 */
export const getEmail = state =>
  isAuthenticated(state) ? state.data.email : null;

/**
 * Get the phone number, if the user is authenticated
 * @param {Object} state
 */
export const getPhone = state =>
  isAuthenticated(state) ? state.data.phone : null;

export const getSuccess = state => state.sync.successMessage;
export const getError = state => state.sync.errorMessage;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync
});

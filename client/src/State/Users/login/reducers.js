import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const userPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.number.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    role: null,
    team: null,
  },
  sync: {
    attempting: 0,
    successMessage: null,
    errorMessage: null,
  },
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
      firstname: action.firstname,
      lastname: action.lastname,
      email: action.email,
      phone: action.phone,
      role: action.role,
      team: action.team,
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
      errorMessage: null,
    };
  case types.FETCH_LOGIN_SUCCESS:
    return {
      attempting: 0,
      successMessage: action.success,
      errorMessage: null,
    };
  case types.FETCH_LOGIN_FAILURE:
    return {
      attempting: 0,
      successMessage: null,
      errorMessage: action.error,
    };
  case types.LOGOUT:
    return INITIAL_STATE.sync;
  default:
    return state;
  }
};

/**
 * Check if the user is authenticated.
 * @param {Object} state
 */
export const isAuthenticated = state =>
  !!(state.data && state.sync.successMessage && !state.sync.errorMessage);

/**
 * Get user data, if user is authenticated
 * @param {Object} state
 */
export const getUserData = state => (isAuthenticated(state) ? state.data : null);

/**
 * Get the id, if user is authenticated
 * @param {Object} state
 */
export const getUserId = state => (isAuthenticated(state) ? state.data.id : null);

/**
 * Get the username, if user is authenticated
 * @param {Object} state
 */
export const getUsername = state => (isAuthenticated(state) ? state.data.username : null);

/**
 * Get the first name, if the user is authenticated
 * @param {Object} state
 */
export const getFirstname = state => (isAuthenticated(state) ? state.data.firstname : null);

/**
 * Get the name, if the user is authenticated
 * @param {Object} state
 */
export const getLastname = state => (isAuthenticated(state) ? state.data.lastname : null);

/**
 * Get the email address, if the user is authenticated
 * @param {Object} state
 */
export const getEmail = state => (isAuthenticated(state) ? state.data.email : null);

/**
 * Get the phone number, if the user is authenticated
 * @param {Object} state
 */
export const getPhone = state => (isAuthenticated(state) ? state.data.phone : null);

/**
 * Get the role, if the user is authenticated
 * @param {Object} state
 */
export const getRole = state => (isAuthenticated(state) ? state.data.role : null);

/**
 * Get the team, if the user is authenticated
 * @param {Object} state
 */
export const getTeam = state => (isAuthenticated(state) ? state.data.team : null);

export const getSuccess = state => state.sync && state.sync.successMessage;
export const getError = state => state.sync && state.sync.errorMessage;
export const isAttempting = state => state.sync && state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

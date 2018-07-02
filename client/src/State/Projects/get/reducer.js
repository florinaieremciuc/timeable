import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

import * as types from './actions';
import { LOGOUT } from '../../Users/login/actions';

export const INITIAL_STATE = Immutable({
  all: [],
  user: [],
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the projects application state.
 * @param {*} state
 * @param {*} action
 */
const all = (state = INITIAL_STATE.all, action) => {
  switch (action.type) {
  case types.GET_PROJECTS_REQUEST: {
    return state;
  }
  case types.GET_PROJECTS_SUCCESS: {
    return action.projects;
  }
  case types.GET_PROJECTS_FAILURE:
  case LOGOUT:
    return INITIAL_STATE.all;
  default:
    return state;
  }
};

const user = (state = INITIAL_STATE.user, action) => {
  switch (action.type) {
  case types.GET_USER_PROJECTS_REQUEST: {
    return state;
  }
  case types.GET_USER_PROJECTS_SUCCESS: {
    return action.projects;
  }
  case types.GET_USER_PROJECTS_FAILURE:
  case LOGOUT:
    return INITIAL_STATE.user;
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
  case types.GET_PROJECTS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_USER_PROJECTS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_PROJECTS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_PROJECTS_FAILURE:
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

export const getAllProjects = state => state.all;
export const getUsersProjects = state => state.user;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  all,
  user,
  sync,
});

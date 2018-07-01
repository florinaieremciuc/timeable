import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

import * as types from './actions';
import { LOGOUT } from '../../Users/login/actions';

export const INITIAL_STATE = Immutable({
  items: [],
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the tasks application state.
 * @param {*} state
 * @param {*} action
 */
const items = (state = INITIAL_STATE.items, action) => {
  switch (action.type) {
  case types.GET_TASKS_REQUEST: {
    return state;
  }
  case types.GET_ASSIGNED_TASKS_REQUEST: {
    return state;
  }
  case types.GET_USERS_TASKS_PER_PROJECT_REQUEST: {
    return state;
  }
  case types.GET_TASKS_SUCCESS: {
    return action.tasks;
  }
  case types.GET_ASSIGNED_TASKS_SUCCESS: {
    return action.tasks;
  }
  case types.GET_USERS_TASKS_PER_PROJECT_SUCCESS: {
    return action.tasks;
  }
  case types.GET_TASKS_FAILURE:
  case types.GET_ASSIGNED_TASKS_FAILURE:
  case types.GET_USERS_TASKS_PER_PROJECT_FAILURE:
  case LOGOUT:
    return INITIAL_STATE.items;
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
  case types.GET_TASKS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_ASSIGNED_TASKS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_USERS_TASKS_PER_PROJECT_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.GET_TASKS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_ASSIGNED_TASKS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_USERS_TASKS_PER_PROJECT_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.GET_TASKS_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  case types.GET_ASSIGNED_TASKS_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  case types.GET_USERS_TASKS_PER_PROJECT_FAILURE:
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

export const getItems = state => state.items;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  items,
  sync,
});

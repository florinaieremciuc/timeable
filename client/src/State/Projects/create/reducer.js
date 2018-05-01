import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const newProjectPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  deadline: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    name: null,
    description: null,
    deadline: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new project data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.FETCH_CREATE_PROJECT_REQUEST:
  case types.FETCH_CREATE_PROJECT_SUCCESS: {
    const newProjectData = {
      id: action.id,
      name: action.name,
      description: null,
      deadlie: action.deadlie,
    };
    if (action.description) {
      newProjectData.description = action.description;
    }
    return newProjectData;
  }
  case types.FETCH_CREATE_PROJECT_FAILURE:
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
  case types.FETCH_CREATE_PROJECT_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.FETCH_CREATE_PROJECT_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.FETCH_CREATE_PROJECT_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get project data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

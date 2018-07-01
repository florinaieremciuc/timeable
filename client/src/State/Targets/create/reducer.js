import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

// use this one for both create and update
export const targetPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  achieved: PropTypes.bool.isRequired,
  project: PropTypes.number.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    description: null,
    achieved: null,
    project: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new target data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_TARGET_REQUEST:
  case types.CREATE_TARGET_SUCCESS: {
    const newTargetData = {
      id: action.id,
      description: action.description,
      achieved: action.achieved,
      project: action.project,
    };
    return newTargetData;
  }
  case types.CREATE_TARGET_FAILURE:
  default:
    return state;
  }
};

/**
 * @param {*} state
 * @param {*} action
 */
const sync = (state = INITIAL_STATE.sync, action) => {
  switch (action.type) {
  case types.CREATE_TARGET_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_TARGET_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_TARGET_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get target data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

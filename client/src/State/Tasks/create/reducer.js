import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

// use this one for both create and update
export const taskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  project: PropTypes.number.isRequired,
  estimate: PropTypes.string.isRequired,
  assignee: PropTypes.number,
  target: PropTypes.number,
  risk: PropTypes.number,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    name: null,
    duration: null,
    description: null,
    status: null,
    priority: null,
    project: null,
    estimate: null,
    assignee: null,
    target: null,
    risk: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new task data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_TASK_REQUEST:
  case types.CREATE_TASK_SUCCESS: {
    const newTaskData = {
      id: action.id,
      name: action.name,
      description: null,
      estimate: action.estimate,
      priority: action.priority,
      status: action.status,
      project: action.project,
      duration: null,
      assignee: null,
      target: null,
      risk: null,
    };
    if (action.description) {
      newTaskData.description = action.description;
    }
    if (action.duration) {
      newTaskData.duration = action.duration;
    }
    if (action.assignee) {
      newTaskData.assignee = action.assignee;
    }
    if (action.target) {
      newTaskData.target = action.target;
    }
    if (action.risk) {
      newTaskData.risk = action.risk;
    }
    return newTaskData;
  }
  case types.CREATE_TASK_FAILURE:
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
  case types.CREATE_TASK_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_TASK_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_TASK_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get task data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

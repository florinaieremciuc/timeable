import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  deleteTask: {
    attempting: 0,
    error: null,
    success: null,
  },
  deleteAssignee: {
    attempting: 0,
    error: null,
  },
});

const deleteTask = (state = INITIAL_STATE.deleteTask, action) => {
  switch (action.type) {
  case types.DELETE_TASK_REQUEST:
    return {
      attempting: 1,
      error: null,
      success: null,
    };
  case types.DELETE_TASK_SUCCESS:
    return {
      attempting: 0,
      error: null,
      success: action.success,
    };
  case types.DELETE_TASK_FAILURE:
    return {
      attempting: 0,
      error: action.error,
      success: null,
    };
  default:
    return state;
  }
};

const deleteAssignee = (state = INITIAL_STATE.deleteAssignee, action) => {
  switch (action.type) {
  case types.DELETE_ASSIGNEE_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.DELETE_ASSIGNEE_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.DELETE_ASSIGNEE_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getErrorDeleteTask = state => state.deleteTask.error;
export const getSuccessDeleteTask = state => state.deleteTask.success;
export const isAttemptingDeleteTask = state => state.deleteTask.attempting;

export const getErrorDeleteAssignee = state => state.deleteAssignee.error;
export const isAttemptingDeleteAssignee = state => state.deleteAssignee.attempting;

export default combineReducers({
  deleteTask,
  deleteAssignee,
});

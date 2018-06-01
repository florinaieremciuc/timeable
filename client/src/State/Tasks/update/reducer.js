import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const INITIAL_STATE = Immutable({
  assignee: {
    attempting: 0,
    error: null,
  },
  status: {
    attempting: 0,
    error: null,
  },
  duration: {
    attempting: 0,
    error: null,
  },
});

/**
 * @param {*} state
 * @param {*} action
 */
const assignee = (state = INITIAL_STATE.assignee, action) => {
  switch (action.type) {
  case types.UPDATE_ASSIGNEE_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.UPDATE_ASSIGNEE_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.UPDATE_ASSIGNEE_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

const status = (state = INITIAL_STATE.status, action) => {
  switch (action.type) {
  case types.UPDATE_STATUS_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.UPDATE_STATUS_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.UPDATE_STATUS_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

const duration = (state = INITIAL_STATE.duration, action) => {
  switch (action.type) {
  case types.UPDATE_DURATION_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.UPDATE_DURATION_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.UPDATE_DURATION_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

export const getAssigneeError = state => state.assignee.error;
export const getStatusError = state => state.status.error;
export const getDurationError = state => state.duration.error;

export const isAttemptingAssignee = state => state.assignee.attempting;
export const isAttemptingStatus = state => state.status.attempting;
export const isAttemptingDuration = state => state.duration.attempting;

export default combineReducers({
  assignee,
  status,
  duration,
});

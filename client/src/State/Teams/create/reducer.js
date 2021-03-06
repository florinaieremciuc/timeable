import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

export const newTeamPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    name: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new team data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_TEAM_REQUEST:
  case types.CREATE_TEAM_SUCCESS: {
    const newTeamData = {
      id: action.id,
      name: action.name,
    };
    return newTeamData;
  }
  case types.CREATE_TEAM_FAILURE:
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
  case types.CREATE_TEAM_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_TEAM_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_TEAM_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get data
 * @param {Object} state
 */
export const getTeam = state => state.data;
/**
 * Get sync
 * @param {Object} state
 */
export const getTeamSync = state => state.sync;

export default combineReducers({
  data,
  sync,
});

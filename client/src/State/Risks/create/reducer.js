import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

// use this one for both create and update
export const riskPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  category: PropTypes.string.isRequired,
  probability: PropTypes.number.isRequired,
  impact: PropTypes.number.isRequired,
  response: PropTypes.string.isRequired,
  project: PropTypes.number.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    description: null,
    category: null,
    probability: null,
    impact: null,
    response: null,
    project: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new risk data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_RISK_REQUEST:
  case types.CREATE_RISK_SUCCESS: {
    const newRiskData = {
      id: action.id,
      description: action.description,
      category: action.category,
      probability: action.probability,
      impact: action.impact,
      response: action.response,
      project: action.project,
    };
    return newRiskData;
  }
  case types.CREATE_RISK_FAILURE:
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
  case types.CREATE_RISK_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_RISK_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_RISK_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get risk data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

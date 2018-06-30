import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actions';

// use this one for both create and update
export const devicePropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  specs: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  project: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
});

export const INITIAL_STATE = Immutable({
  data: {
    id: null,
    name: null,
    specs: null,
    startDate: null,
    endDate: null,
    project: null,
    user: null,
    price: null,
  },
  sync: {
    attempting: 0,
    error: null,
  },
});

/**
 * Reducer for the new device data application state.
 * @param {*} state
 * @param {*} action
 */
const data = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
  case types.CREATE_DEVICE_REQUEST:
  case types.CREATE_DEVICE_SUCCESS: {
    const newDeviceData = {
      id: action.id,
      name: action.name,
      specs: action.specs,
      startDate: action.startDate,
      endDate: action.endDate,
      project: action.project,
      user: action.user,
      price: action.price,
    };
    return newDeviceData;
  }
  case types.CREATE_DEVICE_FAILURE:
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
  case types.CREATE_DEVICE_REQUEST:
    return {
      attempting: 1,
      error: null,
    };
  case types.CREATE_DEVICE_SUCCESS:
    return {
      attempting: 0,
      error: null,
    };
  case types.CREATE_DEVICE_FAILURE:
    return {
      attempting: 0,
      error: action.error,
    };
  default:
    return state;
  }
};

/**
 * Get device data
 * @param {Object} state
 */
export const getData = state => state.data;
export const getError = state => state.sync.error;
export const isAttempting = state => state.sync.attempting;

export default combineReducers({
  data,
  sync,
});

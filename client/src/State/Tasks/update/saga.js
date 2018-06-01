import { put, call } from 'redux-saga/effects';
import {
  updateAssigneeSuccess,
  updateAssigneeFailure,
  updateStatusSuccess,
  updateStatusFailure,
  updateDurationSuccess,
  updateDurationFailure,
} from './actions';
import { updateAssignee, updateStatus, updateDuration } from '../../../services/Tasks';

/**
 * Yield a call to the API for updating a task.
 */
export function* updateAssigneeSaga({ id, assignee }) {
  try {
    const response = yield call(updateAssignee, id, assignee);
    if (response && response.errno) {
      yield put(updateAssigneeFailure(response));
    } else if (response && response.ok) {
      yield put(updateAssigneeSuccess(response.ok));
    } else {
      yield put(updateAssigneeFailure('Unable to update task, please contact support.'));
    }
  } catch (e) {
    yield put(updateAssigneeFailure('Unable to connect to the server.'));
  }
}

export function* updateStatusSaga({ id, status }) {
  try {
    const response = yield call(updateStatus, id, status);
    if (response && response.errno) {
      yield put(updateStatusFailure(response));
    } else if (response && response[0]) {
      yield put(updateStatusSuccess(response[0]));
    } else {
      yield put(updateStatusFailure('Unable to update task, please contact support.'));
    }
  } catch (e) {
    yield put(updateStatusFailure('Unable to connect to the server.'));
  }
}

export function* updateDurationSaga({ id, duration }) {
  try {
    const response = yield call(updateDuration, id, duration);
    if (response && response.errno) {
      yield put(updateDurationFailure(response));
    } else if (response && response[0]) {
      yield put(updateDurationSuccess(response[0]));
    } else {
      yield put(updateDurationFailure('Unable to update task, please contact support.'));
    }
  } catch (e) {
    yield put(updateDurationFailure('Unable to connect to the server.'));
  }
}

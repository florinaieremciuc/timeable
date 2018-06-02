import { put, call } from 'redux-saga/effects';
import {
  getTasksSuccess,
  getTasksFailure,
  getAssignedTasksSuccess,
  getAssignedTasksFailure,
} from './actions';
import { getTasks, getAssignedTasks } from '../../../services/Tasks';

/**
 * Yield a call to the API for getting the tasks list.
 * @param {*} Action payload that contains the `name` field
 */
export function* getTasksSaga(project) {
  try {
    const response = yield call(getTasks, project.projectid);
    if (response && response.error) {
      yield put(getTasksFailure(response));
    } else if (response && Array(response)) {
      yield put(getTasksSuccess(response));
    } else {
      yield put(getTasksFailure('Unable get tasks.'));
    }
  } catch (e) {
    yield put(getTasksFailure('Unable to connect to the server.'));
  }
}

/**
 * Yield a call to the API for getting the assigned tasks list.
 * @param {*} Action payload that contains the `name` field
 */
export function* getAssignedTasksSaga() {
  try {
    const response = yield call(getAssignedTasks);
    if (response && response.error) {
      yield put(getAssignedTasksFailure(response));
    } else if (response && Array(response)) {
      yield put(getAssignedTasksSuccess(response));
    } else {
      yield put(getAssignedTasksFailure('Unable get assigned tasks.'));
    }
  } catch (e) {
    yield put(getAssignedTasksFailure('Unable to connect to the server.'));
  }
}

import { put, call } from 'redux-saga/effects';
import {
  deleteTaskSuccess,
  deleteTaskFailure,
  deleteAssigneeSuccess,
  deleteAssigneeFailure,
} from './actions';
import { deleteTask, removeAssignee } from '../../../services/Tasks';

/**
 * Yield a call to the API for deleting a task.
 * @param {*} Action payload that contains the `id` field
 */
export function* deleteTaskSaga({ id }) {
  try {
    const response = yield call(deleteTask, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteTaskSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteTaskFailure(response));
    } else {
      yield put(deleteTaskFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteTaskFailure('Unable to connect to the server.', e));
  }
}

/**
 * Yield a call to the API for deleting an assignee.
 * @param {*} Action payload that contains the `id` field
 */
export function* deleteAssigneeSaga({ task, assignee }) {
  try {
    const response = yield call(removeAssignee, task, assignee);
    console.log('saga', task, assignee, response);
    if (response && response.errno) {
      yield put(deleteAssigneeFailure(response));
    } else if (response && response.ok) {
      yield put(deleteAssigneeSuccess(response.ok));
    } else {
      yield put(deleteAssigneeFailure('Unable to delete task, please contact support.'));
    }
  } catch (e) {
    yield put(deleteAssigneeFailure('Unable to connect to the server.'));
  }
}

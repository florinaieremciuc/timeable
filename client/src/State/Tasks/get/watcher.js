import { takeEvery } from 'redux-saga/effects';
import { getTasksSaga, getAssignedTasksSaga } from './saga';
import { GET_TASKS_REQUEST, GET_ASSIGNED_TASKS_REQUEST } from './actions';

/**
 * Watches for GET_TASKS_REQUEST action type asynchronously
 */
export function* watchGetTasksAttempt() {
  yield takeEvery(GET_TASKS_REQUEST, getTasksSaga);
}

/**
 * Watches for GET_ASSIGNED_TASKS_REQUEST action type asynchronously
 */
export function* watchGetAssignedTasksAttempt() {
  yield takeEvery(GET_ASSIGNED_TASKS_REQUEST, getAssignedTasksSaga);
}

import { takeEvery } from 'redux-saga/effects';
import { getTasksSaga, getAssignedTasksSaga, getUsersTasksperProjectSaga } from './saga';
import {
  GET_TASKS_REQUEST,
  GET_ASSIGNED_TASKS_REQUEST,
  GET_USERS_TASKS_PER_PROJECT_REQUEST,
} from './actions';

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

/**
 * Watches for GET_ASSIGNED_TASKS_REQUEST action type asynchronously
 */
export function* watchGetUsersTasksperProjectAttempt() {
  yield takeEvery(GET_USERS_TASKS_PER_PROJECT_REQUEST, getUsersTasksperProjectSaga);
}

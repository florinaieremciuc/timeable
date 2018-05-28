import { takeEvery } from 'redux-saga/effects';
import getTasksSaga from './saga';
import { GET_TASKS_REQUEST } from './actions';

/**
 * Watches for GET_TASKS_REQUEST action type asynchronously
 */
export default function* watchGetTasksAttempt() {
  yield takeEvery(GET_TASKS_REQUEST, getTasksSaga);
}

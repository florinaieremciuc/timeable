import { takeEvery } from 'redux-saga/effects';
import createTaskSaga from './saga';
import { CREATE_TASK_REQUEST } from './actions';

/**
 * Watches for CREATE_TASK_REQUEST action type asynchronously
 */
export default function* watchCreateTaskAttempt() {
  yield takeEvery(CREATE_TASK_REQUEST, createTaskSaga);
}

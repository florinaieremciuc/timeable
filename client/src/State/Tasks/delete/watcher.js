import { takeEvery } from 'redux-saga/effects';
import deleteTaskSaga from './saga';
import { DELETE_TASK_REQUEST } from './actions';

/**
 * Watches for DELETE_TASK_REQUEST action type asynchronously
 */
export default function* watchDeleteTaskAttempt() {
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
}

import { takeEvery } from 'redux-saga/effects';
import { deleteTaskSaga, deleteAssigneeSaga } from './saga';
import { DELETE_TASK_REQUEST, DELETE_ASSIGNEE_REQUEST } from './actions';

/**
 * Watches for DELETE_TASK_REQUEST action type asynchronously
 */
export function* watchDeleteTaskAttempt() {
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
}

/**
 * Watches for DELETE_ASSIGNEE_REQUEST action type asynchronously
 */
export function* watchDeleteAssigneeAttempt() {
  yield takeEvery(DELETE_ASSIGNEE_REQUEST, deleteAssigneeSaga);
}

import { takeEvery } from 'redux-saga/effects';
import { updateAssigneeSaga, updateStatusSaga, updateDurationSaga } from './saga';
import { UPDATE_ASSIGNEE_REQUEST, UPDATE_STATUS_REQUEST, UPDATE_DURATION_REQUEST } from './actions';

/**
 * Watches for UPDATE_ASSIGNEE_REQUEST action type asynchronously
 */
export function* watchUpdateAssigneeAttempt() {
  yield takeEvery(UPDATE_ASSIGNEE_REQUEST, updateAssigneeSaga);
}

/**
 * Watches for UPDATE_STATUS_REQUEST action type asynchronously
 */
export function* watchUpdateStatusAttempt() {
  yield takeEvery(UPDATE_STATUS_REQUEST, updateStatusSaga);
}

/**
 * Watches for UPDATE_DURATION_REQUEST action type asynchronously
 */
export function* watchUpdateDurationAttempt() {
  yield takeEvery(UPDATE_DURATION_REQUEST, updateDurationSaga);
}

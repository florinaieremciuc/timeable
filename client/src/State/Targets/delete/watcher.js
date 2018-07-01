import { takeEvery } from 'redux-saga/effects';
import deleteTargetSaga from './saga';
import { DELETE_TARGET_REQUEST } from './actions';

/**
 * Watches for DELETE_TARGET_REQUEST action type asynchronously
 */
export default function* watchDeleteTargetAttempt() {
  yield takeEvery(DELETE_TARGET_REQUEST, deleteTargetSaga);
}

import { takeEvery } from 'redux-saga/effects';
import updateTargetSaga from './saga';
import { UPDATE_TARGET_REQUEST } from './actions';

/**
 * Watches for UPDATE_TARGET_REQUEST action type asynchronously
 */
export default function* watchUpdateTargetAttempt() {
  yield takeEvery(UPDATE_TARGET_REQUEST, updateTargetSaga);
}

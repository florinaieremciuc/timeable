import { takeEvery } from 'redux-saga/effects';
import createTargetSaga from './saga';
import { CREATE_TARGET_REQUEST } from './actions';

/**
 * Watches for CREATE_TARGET_REQUEST action type asynchronously
 */
export default function* watchCreateTargetAttempt() {
  yield takeEvery(CREATE_TARGET_REQUEST, createTargetSaga);
}

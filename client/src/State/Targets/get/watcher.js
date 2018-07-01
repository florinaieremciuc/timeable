import { takeEvery } from 'redux-saga/effects';
import getTargetsSaga from './saga';
import { GET_TARGETS_REQUEST } from './actions';

/**
 * Watches for GET_TARGETS_REQUEST action type asynchronously
 */
export default function* watchGetTargetsAttempt() {
  yield takeEvery(GET_TARGETS_REQUEST, getTargetsSaga);
}

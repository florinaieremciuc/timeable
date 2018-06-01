import { takeEvery } from 'redux-saga/effects';
import getUserSaga from './saga';
import { GET_USER_REQUEST } from './actions';

/**
 * Watches for GET_USER_REQUEST action type asynchronously
 */
export default function* watchGetUserAttempt() {
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
}

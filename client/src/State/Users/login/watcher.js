import { takeEvery } from 'redux-saga/effects';
import loginSaga from './saga';
import { LOGIN_REQUEST } from './actions';

/**
 * Watches for LOGIN_REQUEST action type asynchronously
 */
export default function* watchLoginAttempt() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}

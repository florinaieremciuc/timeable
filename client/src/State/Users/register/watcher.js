import { takeLatest } from 'redux-saga/effects';
import registerSaga from './saga';
import { FETCH_REGISTER_REQUEST } from './actions';

/**
 * Watches for FETCH_REGISTER_REQUEST action type asynchronously
 */
export default function* watchRegisterAttempt() {
  yield takeLatest(FETCH_REGISTER_REQUEST, registerSaga);
}

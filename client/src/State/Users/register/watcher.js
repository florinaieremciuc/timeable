import { takeLatest } from 'redux-saga/effects';
import registerSaga from './saga';
import { REGISTER_REQUEST } from './actions';

/**
 * Watches for REGISTER_REQUEST action type asynchronously
 */
export default function* watchRegisterAttempt() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

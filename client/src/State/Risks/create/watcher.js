import { takeEvery } from 'redux-saga/effects';
import createRiskSaga from './saga';
import { CREATE_RISK_REQUEST } from './actions';

/**
 * Watches for CREATE_RISK_REQUEST action type asynchronously
 */
export default function* watchCreateRiskAttempt() {
  yield takeEvery(CREATE_RISK_REQUEST, createRiskSaga);
}

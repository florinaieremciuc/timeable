import { takeEvery } from 'redux-saga/effects';
import deleteRiskSaga from './saga';
import { DELETE_RISK_REQUEST } from './actions';

/**
 * Watches for DELETE_RISK_REQUEST action type asynchronously
 */
export default function* watchDeleteRiskAttempt() {
  yield takeEvery(DELETE_RISK_REQUEST, deleteRiskSaga);
}

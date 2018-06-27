import { takeEvery } from 'redux-saga/effects';
import getRisksSaga from './saga';
import { GET_RISKS_REQUEST } from './actions';

/**
 * Watches for GET_RISKS_REQUEST action type asynchronously
 */
export default function* watchGetRisksAttempt() {
  yield takeEvery(GET_RISKS_REQUEST, getRisksSaga);
}

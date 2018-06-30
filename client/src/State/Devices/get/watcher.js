import { takeEvery } from 'redux-saga/effects';
import getDevicesSaga from './saga';
import { GET_DEVICES_REQUEST } from './actions';

/**
 * Watches for GET_DEVICES_REQUEST action type asynchronously
 */
export default function* watchGetDevicesAttempt() {
  yield takeEvery(GET_DEVICES_REQUEST, getDevicesSaga);
}

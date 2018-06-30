import { takeEvery } from 'redux-saga/effects';
import createDeviceSaga from './saga';
import { CREATE_DEVICE_REQUEST } from './actions';

/**
 * Watches for CREATE_DEVICE_REQUEST action type asynchronously
 */
export default function* watchCreateDeviceAttempt() {
  yield takeEvery(CREATE_DEVICE_REQUEST, createDeviceSaga);
}

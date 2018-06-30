import { takeEvery } from 'redux-saga/effects';
import deleteDeviceSaga from './saga';
import { DELETE_DEVICE_REQUEST } from './actions';

/**
 * Watches for DELETE_DEVICE_REQUEST action type asynchronously
 */
export default function* watchDeleteDeviceAttempt() {
  yield takeEvery(DELETE_DEVICE_REQUEST, deleteDeviceSaga);
}

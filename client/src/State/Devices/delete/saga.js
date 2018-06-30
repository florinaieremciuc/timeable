import { put, call } from 'redux-saga/effects';
import { deleteDeviceSuccess, deleteDeviceFailure } from './actions';
import { deleteDevice } from '../../../services/Devices';

/**
 * Yield a call to the API for deleting a device.
 * @param {*} Action payload that contains the `id` field
 */
export default function* deleteDeviceSaga({ id }) {
  try {
    const response = yield call(deleteDevice, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteDeviceSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteDeviceFailure(response));
    } else {
      yield put(deleteDeviceFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteDeviceFailure('Unable to connect to the server.', e));
  }
}

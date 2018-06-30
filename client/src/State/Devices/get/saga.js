import { put, call } from 'redux-saga/effects';
import { getDevicesSuccess, getDevicesFailure } from './actions';
import { getDevices } from '../../../services/Devices';

/**
 * Yield a call to the API for getting the devices list.
 */
export default function* getDevicesSaga(project) {
  try {
    const response = yield call(getDevices, project.projectid);
    if (response && response.error) {
      yield put(getDevicesFailure(response));
    } else if (response && Array(response)) {
      yield put(getDevicesSuccess(response));
    } else {
      yield put(getDevicesFailure('Unable get devices.'));
    }
  } catch (e) {
    yield put(getDevicesFailure('Unable to connect to the server.'));
  }
}

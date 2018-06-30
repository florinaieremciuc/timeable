import { put, call } from 'redux-saga/effects';
import { createDeviceSuccess, createDeviceFailure } from './actions';
import { createDevice } from '../../../services/Devices';

/**
 * Yield a call to the API for creating a device.
 */
export default function* createDeviceSaga({
  name,
  specs,
  startDate,
  endDate,
  project,
  user,
  price,
}) {
  try {
    const res = yield call(createDevice, name, specs, startDate, endDate, project, user, price);
    if (res && res.errno) {
      yield put(createDeviceFailure(res));
    } else if (res && res[0]) {
      yield put(createDeviceSuccess(res[0], name, specs, startDate, endDate, project, user, price));
    } else {
      yield put(createDeviceFailure('Unable to create device, please contact support.'));
    }
  } catch (e) {
    yield put(createDeviceFailure('Unable to connect to the server.'));
  }
}

import { put, call } from 'redux-saga/effects';
import { updateTargetSuccess, updateTargetFailure } from './actions';
import { updateTarget } from '../../../services/Targets';

/**
 * Yield a call to the API for updating a task.
 */
export default function* updateTargetSaga({ id, data }) {
  try {
    const response = yield call(updateTarget, id, data);
    if (response && response.errno) {
      yield put(updateTargetFailure(response));
    } else if (response && response.ok) {
      yield put(updateTargetSuccess(response.ok));
    } else {
      yield put(updateTargetFailure('Unable to update task, please contact support.'));
    }
  } catch (e) {
    yield put(updateTargetFailure('Unable to connect to the server.'));
  }
}

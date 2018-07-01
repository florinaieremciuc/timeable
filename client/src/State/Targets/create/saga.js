import { put, call } from 'redux-saga/effects';
import { createTargetSuccess, createTargetFailure } from './actions';
import { createTarget } from '../../../services/Targets';

/**
 * Yield a call to the API for creating a target.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createTargetSaga({ description, achieved, project }) {
  try {
    const res = yield call(createTarget, description, achieved, project);
    if (res && res.errno) {
      yield put(createTargetFailure(res));
    } else if (res && res[0]) {
      yield put(createTargetSuccess(res[0], description, achieved, project));
    } else {
      yield put(createTargetFailure('Unable to create target, please contact support.'));
    }
  } catch (e) {
    yield put(createTargetFailure('Unable to connect to the server.'));
  }
}

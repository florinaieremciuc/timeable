import { put, call } from 'redux-saga/effects';
import { getTargetsSuccess, getTargetsFailure } from './actions';
import { getTargets } from '../../../services/Targets';

/**
 * Yield a call to the API for getting the targets list.
 */
export default function* getTargetsSaga(project) {
  try {
    const response = yield call(getTargets, project.projectid);
    if (response && response.error) {
      yield put(getTargetsFailure(response));
    } else if (response && Array(response)) {
      yield put(getTargetsSuccess(response));
    } else {
      yield put(getTargetsFailure('Unable to get targets.'));
    }
  } catch (e) {
    yield put(getTargetsFailure('Unable to connect to the server.'));
  }
}

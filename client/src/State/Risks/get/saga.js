import { put, call } from 'redux-saga/effects';
import { getRisksSuccess, getRisksFailure } from './actions';
import { getRisks } from '../../../services/Risks';

/**
 * Yield a call to the API for getting the risks list.
 */
export default function* getRisksSaga(project) {
  try {
    const response = yield call(getRisks, project.projectid);
    if (response && response.error) {
      yield put(getRisksFailure(response));
    } else if (response && Array(response)) {
      yield put(getRisksSuccess(response));
    } else {
      yield put(getRisksFailure('Unable get risks.'));
    }
  } catch (e) {
    yield put(getRisksFailure('Unable to connect to the server.'));
  }
}

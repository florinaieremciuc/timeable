import { put, call } from 'redux-saga/effects';
import { getProjectsSuccess, getProjectsFailure } from './actions';
import { getProjects } from '../../../services/Api';

/**
 * Yield a call to the API for getting the projects list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getProjectsSaga() {
  try {
    const response = yield call(getProjects);
    if (response && response.error) {
      yield put(getProjectsFailure(response));
    } else if (response && Array(response)) {
      yield put(getProjectsSuccess(response));
    } else {
      yield put(getProjectsFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(getProjectsFailure('Unable to connect to the server.'));
  }
}
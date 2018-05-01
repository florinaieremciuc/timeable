import { takeEvery } from 'redux-saga/effects';
import getProjectsSaga from './saga';
import { FETCH_GET_PROJECTS_REQUEST } from './actions';

/**
 * Watches for FETCH_GET_PROJECTS_REQUEST action type asynchronously
 */
export default function* watchGetProjectsAttempt() {
  yield takeEvery(FETCH_GET_PROJECTS_REQUEST, getProjectsSaga);
}

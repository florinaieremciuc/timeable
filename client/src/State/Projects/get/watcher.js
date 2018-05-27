import { takeEvery } from 'redux-saga/effects';
import getProjectsSaga from './saga';
import { GET_PROJECTS_REQUEST } from './actions';

/**
 * Watches for GET_PROJECTS_REQUEST action type asynchronously
 */
export default function* watchGetProjectsAttempt() {
  yield takeEvery(GET_PROJECTS_REQUEST, getProjectsSaga);
}

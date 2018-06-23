import { takeEvery } from 'redux-saga/effects';
import { getProjectsSaga, getUserProjectsSaga } from './saga';
import { GET_PROJECTS_REQUEST, GET_USER_PROJECTS_REQUEST } from './actions';

/**
 * Watches for GET_PROJECTS_REQUEST action type asynchronously
 */
export function* watchGetProjectsAttempt() {
  yield takeEvery(GET_PROJECTS_REQUEST, getProjectsSaga);
}

/**
 * Watches for GET_USER_PROJECTS_REQUEST action type asynchronously
 */
export function* watchGetUserProjectsAttempt() {
  yield takeEvery(GET_USER_PROJECTS_REQUEST, getUserProjectsSaga);
}

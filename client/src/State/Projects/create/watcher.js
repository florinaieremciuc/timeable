import { takeEvery } from 'redux-saga/effects';
import createProjectSaga from './saga';
import { FETCH_CREATE_PROJECT_REQUEST } from './actions';

/**
 * Watches for FETCH_CREATE_PROJECT_REQUEST action type asynchronously
 */
export default function* watchCreateProjectAttempt() {
  yield takeEvery(FETCH_CREATE_PROJECT_REQUEST, createProjectSaga);
}

import { takeEvery } from 'redux-saga/effects';
import createProjectSaga from './saga';
import { CREATE_PROJECT_REQUEST } from './actions';

/**
 * Watches for CREATE_PROJECT_REQUEST action type asynchronously
 */
export default function* watchCreateProjectAttempt() {
  yield takeEvery(CREATE_PROJECT_REQUEST, createProjectSaga);
}

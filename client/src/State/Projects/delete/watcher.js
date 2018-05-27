import { takeEvery } from 'redux-saga/effects';
import deleteProjectSaga from './saga';
import { DELETE_PROJECT_REQUEST } from './actions';

/**
 * Watches for DELETE_PROJECT_REQUEST action type asynchronously
 */
export default function* watchDeleteProjectAttempt() {
  yield takeEvery(DELETE_PROJECT_REQUEST, deleteProjectSaga);
}

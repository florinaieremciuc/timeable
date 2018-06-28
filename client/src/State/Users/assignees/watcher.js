import { takeEvery } from 'redux-saga/effects';
import getAssigneesSaga from './saga';
import { GET_ASSIGNEES_REQUEST } from './actions';

/**
 * Watches for GET_ASSIGNEES_REQUEST action type asynchronously
 */
export default function* watchGetAssigneesAttempt() {
  yield takeEvery(GET_ASSIGNEES_REQUEST, getAssigneesSaga);
}

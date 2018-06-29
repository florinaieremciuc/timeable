import { takeEvery } from 'redux-saga/effects';
import deleteEventSaga from './saga';
import { DELETE_EVENT_REQUEST } from './actions';

/**
 * Watches for DELETE_EVENT_REQUEST action type asynchronously
 */
export default function* watchDeleteEventAttempt() {
  yield takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga);
}

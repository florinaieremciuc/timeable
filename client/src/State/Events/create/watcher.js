import { takeEvery } from 'redux-saga/effects';
import createEventSaga from './saga';
import { CREATE_EVENT_REQUEST } from './actions';

/**
 * Watches for CREATE_EVENT_REQUEST action type asynchronously
 */
export default function* watchCreateEventAttempt() {
  yield takeEvery(CREATE_EVENT_REQUEST, createEventSaga);
}

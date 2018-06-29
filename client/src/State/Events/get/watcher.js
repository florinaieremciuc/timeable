import { takeEvery } from 'redux-saga/effects';
import getEventsSaga from './saga';
import { GET_EVENTS_REQUEST } from './actions';

/**
 * Watches for GET_EVENTS_REQUEST action type asynchronously
 */
export default function* watchGetEventsAttempt() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga);
}

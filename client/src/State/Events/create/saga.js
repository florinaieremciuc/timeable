import { put, call } from 'redux-saga/effects';
import { createEventSuccess, createEventFailure } from './actions';
import { createEvent } from '../../../services/Events';

/**
 * Yield a call to the API for creating an event.
 */
export default function* createEventSaga({
  name, topic, date, details, place, extra, team,
}) {
  try {
    const response = yield call(createEvent, name, topic, date, details, place, extra, team);
    // verify if the authentication was successful
    if (response && response.errno) {
      yield put(createEventFailure(response));
    } else if (response && response[0]) {
      yield put(createEventSuccess(response[0], name, topic, date, details, place, extra, team));
    } else {
      yield put(createEventFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(createEventFailure('Unable to connect to the server.'));
  }
}

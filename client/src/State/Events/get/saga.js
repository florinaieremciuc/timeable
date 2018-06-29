import { put, call } from 'redux-saga/effects';
import { getEventsSuccess, getEventsFailure } from './actions';
import { getEvents } from '../../../services/Events';

/**
 * Yield a call to the API for getting the events list.
 */
export default function* getEventsSaga(team) {
  try {
    const response = yield call(getEvents, team.teamid);
    if (response && response.error) {
      yield put(getEventsFailure(response));
    } else if (response && Array(response)) {
      yield put(getEventsSuccess(response));
    } else {
      yield put(getEventsFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(getEventsFailure('Unable to connect to the server.'));
  }
}

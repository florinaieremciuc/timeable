import { put, call } from 'redux-saga/effects';
import { deleteEventSuccess, deleteEventFailure } from './actions';
import { deleteEvent } from '../../../services/Events';

/**
 * Yield a call to the API for deleting a event.
 * @param {*} Action payload that contains the `id` field
 */
export default function* deleteEventSaga({ id }) {
  try {
    const response = yield call(deleteEvent, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteEventSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteEventFailure(response));
    } else {
      yield put(deleteEventFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteEventFailure('Unable to connect to the server.', e));
  }
}

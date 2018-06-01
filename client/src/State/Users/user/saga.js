import { put, call } from 'redux-saga/effects';
import { getUserSuccess, getUserFailure } from './actions';
import { getUser } from '../../../services/Users';

/**
 * Yield a call to the API for getting user data.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getUserSaga(id) {
  try {
    const response = yield call(getUser, id);
    if (response && response.error) {
      yield put(getUserFailure(response));
    } else if (response && response.user) {
      yield put(getUserSuccess(response.user));
    } else {
      yield put(getUserFailure('Unable to get user.'));
    }
  } catch (e) {
    yield put(getUserFailure('Unable to connect to the server.'));
  }
}

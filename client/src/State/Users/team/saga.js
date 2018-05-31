import { put, call } from 'redux-saga/effects';
import { getMembersSuccess, getMembersFailure } from './actions';
import { getMembers } from '../../../services/Users';

/**
 * Yield a call to the API for getting the projects list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getMembersSaga(action) {
  try {
    const response = yield call(getMembers, action.teamid);
    if (response && response.error) {
      yield put(getMembersFailure(response));
    } else if (response && Array(response)) {
      yield put(getMembersSuccess(response));
    } else {
      yield put(getMembersFailure('Unable to get members.'));
    }
  } catch (e) {
    yield put(getMembersFailure('Unable to connect to the server.'));
  }
}

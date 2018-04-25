import { put, call } from 'redux-saga/effects';
import { createTeamSuccess, createTeamFailure } from './actions';
import { createTeam } from '../../../services/Api';

/**
 * Yield a call to the API for creating a team.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createTeamSaga({ name }) {
  try {
    const response = yield call(createTeam, name.toLowerCase());
    // verify if the authentication was successful
    if (response && response.errno) {
      yield put(createTeamFailure(response));
    } else if (response && response[0]) {
      yield put(createTeamSuccess(response[0], name));
    } else {
      yield put(createTeamFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(createTeamFailure('Unable to connect to the server.'));
  }
}

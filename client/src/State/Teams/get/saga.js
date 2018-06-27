import { put, call } from 'redux-saga/effects';
import { getTeamSuccess, getTeamFailure } from './actions';
import { getTeam } from '../../../services/Teams';

/**
 * Yield a call to the API for getting the team list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getTeamSaga(team) {
  try {
    const response = yield call(getTeam, team.teamid);
    if (response && response.error) {
      yield put(getTeamFailure(response));
    } else if (response && Array(response)) {
      yield put(getTeamSuccess(response));
    } else {
      yield put(getTeamFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(getTeamFailure('Unable to connect to the server.'));
  }
}

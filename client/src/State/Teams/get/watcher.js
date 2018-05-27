import { takeEvery } from 'redux-saga/effects';
import getTeamsSaga from './saga';
import { GET_TEAMS_REQUEST } from './actions';

/**
 * Watches for GET_TEAMS_REQUEST action type asynchronously
 */
export default function* watchGetTeamsAttempt() {
  yield takeEvery(GET_TEAMS_REQUEST, getTeamsSaga);
}

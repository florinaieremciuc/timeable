import { takeEvery } from 'redux-saga/effects';
import getTeamSaga from './saga';
import { GET_TEAM_REQUEST } from './actions';

/**
 * Watches for GET_TEAM_REQUEST action type asynchronously
 */
export default function* watchGetTeamAttempt() {
  yield takeEvery(GET_TEAM_REQUEST, getTeamSaga);
}

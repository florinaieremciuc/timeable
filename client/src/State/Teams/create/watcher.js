import { takeEvery } from 'redux-saga/effects';
import createTeamSaga from './saga';
import { CREATE_TEAM_REQUEST } from './actions';

/**
 * Watches for CREATE_TEAM_REQUEST action type asynchronously
 */
export default function* watchCreateTeamAttempt() {
  yield takeEvery(CREATE_TEAM_REQUEST, createTeamSaga);
}

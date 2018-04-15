import { takeLatest, takeEvery } from "redux-saga/effects";
import createTeamSaga from "./saga";
import { FETCH_CREATE_TEAM_REQUEST } from "./actions";

/**
 * Watches for FETCH_CREATE_TEAM_REQUEST action type asynchronously
 */
export default function* watchCreateTeamAttempt() {
  yield takeEvery(FETCH_CREATE_TEAM_REQUEST, createTeamSaga);
}

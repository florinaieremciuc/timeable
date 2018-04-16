import { takeLatest, takeEvery } from "redux-saga/effects";
import getTeamsSaga from "./saga";
import { FETCH_GET_TEAMS_REQUEST } from "./actions";

/**
 * Watches for FETCH_GET_TEAMS_REQUEST action type asynchronously
 */
export default function* watchGetTeamsAttempt() {
  yield takeEvery(FETCH_GET_TEAMS_REQUEST, getTeamsSaga);
}

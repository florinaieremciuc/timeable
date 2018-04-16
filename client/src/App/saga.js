import { put, call } from "redux-saga/effects";
import { getTeamsSuccess, getTeamsFailure } from "./actions";
import { getTeams } from "../services/Api";

/**
 * Yield a call to the API for getting the teams list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getTeamsSaga() {
  try {
    const response = yield call(getTeams);
    if (response && response.error) {
      yield put(getTeamsFailure(response));
    } else if (response && Array(response)) {
      yield put(getTeamsSuccess(response));
    } else {
      yield put(getTeamsFailure("Unable to log in, please contact support."));
    }
  } catch (e) {
    yield put(getTeamsFailure("Unable to connect to the server."));
  }
}

import { put, call } from "redux-saga/effects";
import { createTeamSuccess, createTeamFailure } from "./actions";
import { createTeam } from "../../services/Api";

/**
 * Yield a call to the API for creating a team.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createTeamSaga({ name }) {
  try {
    const response = yield call(createTeam, name.toLowerCase());
    // verify if the authentication was successful
    if (response && response.success && response.team) {
      yield put(createTeamSuccess(response.team.id, name));
    } else if (response && response.error) {
      yield put(createTeamFailure(response.error));
    } else {
      yield put(createTeamFailure("Unable to log in, please contact support."));
    }
  } catch (e) {
    yield put(createTeamFailure("Unable to connect to the server."));
  }
}

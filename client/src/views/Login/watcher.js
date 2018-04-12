import { takeLatest, takeEvery } from "redux-saga/effects";
import loginSaga from "./saga";
import { FETCH_LOGIN_REQUEST } from "./actions";

/**
 * Watches for FETCH_LOGIN_REQUEST action type asynchronously
 */
export default function* watchLoginAttempt() {
  yield takeEvery(FETCH_LOGIN_REQUEST, loginSaga);
}

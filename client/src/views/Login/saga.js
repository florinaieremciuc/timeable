import { put, call } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import { signInUser } from "../../services/Api";

/**
 * Yield a call to the API for authenticating the user using email and password.
 * @param {*} Action payload that contains the `email` and `password` fields
 */
export default function* loginSaga({ username, password }) {
  try {
    const response = yield call(signInUser, username.toLowerCase(), password);

    console.log("aci", response);
    // verify if the authentication was successful
    if (response && response.success && response.user) {
      yield put(
        loginSuccess(
          response.user.id,
          username,
          response.user.first_name,
          response.user.last_name,
          response.user.email,
          response.user.phone,
          response.user.role,
          response.success
        )
      );
    } else if (response && response.errorMessage) {
      yield put(loginFailure(response.errorMessage));
    } else {
      yield put(loginFailure("Unable to log in, please contact support."));
    }
  } catch (e) {
    yield put(loginFailure("Unable to connect to the server."));
  }
}

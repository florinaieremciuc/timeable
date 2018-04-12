import { put, call } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./actions";
import { signInUser } from "../../services/Api";

/**
 * Yield a call to the API for authenticating the user using email and password.
 * @param {*} Action payload that contains the `email` and `password` fields
 */
export default function* loginSaga({ username, password }) {
  try {
    console.log("saga 2", username, password);
    // make the call to the api
    let response;
    // const response = yield call(signInUser, username.toLowerCase(), password);
    console.log(
      "lkjdajkdkljda",
      yield call(signInUser, username.toLowerCase(), password)
    );

    console.log("aci");
    // verify if the authentication was successful
    if (response && response.successMessage) {
      yield put(
        loginSuccess(
          response.id,
          username,
          response.firstName,
          response.lastName,
          response.email,
          response.phone
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

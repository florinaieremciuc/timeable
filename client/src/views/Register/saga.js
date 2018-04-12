import { put, call } from "redux-saga/effects";
import { registerSuccess, registerFailure } from "./actions";
import { registerUser } from "../../services/Api";

/**
 * Yield a call to the API for registering the user using
 * username, password, email, first name, last name and phone number.
 * @param {*} Action payload that contains the
 * `username`, `password`, `email`, `first name`, `last name` and `phone number` fields
 */
export default function* registerSaga({
  username,
  password,
  firstName,
  lastName,
  email,
  phone
}) {
  try {
    // make the call to the api
    const response = yield call(
      registerUser,
      username.toLowerCase(),
      password,
      firstName,
      lastName,
      email,
      phone
    );

    // verify if the authentication was successful
    if (response && response.successMessage) {
      // add token and refreshToken in the application's state
      yield put(registerSuccess(response.successMessage));
    } else if (response && response.errorMessage) {
      yield put(registerFailure(response.errorMessage));
    } else {
      yield put(registerFailure("Unable to log in, please contact support."));
    }
  } catch (e) {
    yield put(registerFailure("Unable to connect to the server."));
  }
}

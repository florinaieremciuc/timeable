import { put, call } from 'redux-saga/effects';
import { createProjectSuccess, createProjectFailure } from './actions';
import { createProject } from '../../../services/Projects';

/**
 * Yield a call to the API for creating a project.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createProjectSaga({
  name, description, deadline, team, startDate,
}) {
  try {
    const response = yield call(
      createProject,
      name.toLowerCase(),
      description,
      deadline,
      team,
      startDate,
    );
    // verify if the authentication was successful
    if (response && response.errno) {
      yield put(createProjectFailure(response));
    } else if (response && response[0]) {
      yield put(createProjectSuccess(response[0], name, description, deadline, team, startDate));
    } else {
      yield put(createProjectFailure('Unable to log in, please contact support.'));
    }
  } catch (e) {
    yield put(createProjectFailure('Unable to connect to the server.'));
  }
}

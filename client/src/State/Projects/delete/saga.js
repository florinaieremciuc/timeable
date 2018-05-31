import { put, call } from 'redux-saga/effects';
import { deleteProjectSuccess, deleteProjectFailure } from './actions';
import { deleteProject } from '../../../services/Projects';

/**
 * Yield a call to the API for deleting a project.
 * @param {*} Action payload that contains the `id` field
 */
export default function* deleteProjectSaga({ id }) {
  try {
    const response = yield call(deleteProject, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteProjectSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteProjectFailure(response));
    } else {
      yield put(deleteProjectFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteProjectFailure('Unable to connect to the server.', e));
  }
}

import { put, call } from 'redux-saga/effects';
import { deleteTargetSuccess, deleteTargetFailure } from './actions';
import { deleteTarget } from '../../../services/Targets';

/**
 * Yield a call to the API for deleting a target.
 */
export default function* deleteTargetSaga({ id }) {
  try {
    const response = yield call(deleteTarget, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteTargetSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteTargetFailure(response));
    } else {
      yield put(deleteTargetFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteTargetFailure('Unable to connect to the server.', e));
  }
}

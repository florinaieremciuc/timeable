import { put, call } from 'redux-saga/effects';
import { deleteRiskSuccess, deleteRiskFailure } from './actions';
import { deleteRisk } from '../../../services/Risks';

/**
 * Yield a call to the API for deleting a risk.
 * @param {*} Action payload that contains the `id` field
 */
export default function* deleteRiskSaga({ id }) {
  try {
    const response = yield call(deleteRisk, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteRiskSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteRiskFailure(response));
    } else {
      yield put(deleteRiskFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteRiskFailure('Unable to connect to the server.', e));
  }
}

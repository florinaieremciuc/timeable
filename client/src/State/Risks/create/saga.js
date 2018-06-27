import { put, call } from 'redux-saga/effects';
import { createRiskSuccess, createRiskFailure } from './actions';
import { createRisk } from '../../../services/Risks';

/**
 * Yield a call to the API for creating a risk.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createRiskSaga({
  description,
  category,
  probability,
  impact,
  response,
  project,
}) {
  try {
    const res = yield call(
      createRisk,
      description,
      category,
      probability,
      impact,
      response,
      project,
    );
    if (res && res.errno) {
      yield put(createRiskFailure(res));
    } else if (res && res[0]) {
      yield put(createRiskSuccess(res[0], description, category, probability, impact, response, project));
    } else {
      yield put(createRiskFailure('Unable to create risk, please contact support.'));
    }
  } catch (e) {
    yield put(createRiskFailure('Unable to connect to the server.'));
  }
}

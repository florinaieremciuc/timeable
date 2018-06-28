import { put, call } from 'redux-saga/effects';
import { getAssigneesSuccess, getAssigneesFailure } from './actions';
import { getAssignees } from '../../../services/Users';

/**
 * Yield a call to the API for getting the projects list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getAssigneesSaga(action) {
  try {
    const response = yield call(getAssignees, action.teamid);
    if (response && response.error) {
      yield put(getAssigneesFailure(response));
    } else if (response && response.assignees) {
      yield put(getAssigneesSuccess(response.assignees));
    } else {
      yield put(getAssigneesFailure('Unable to get assignees.'));
    }
  } catch (e) {
    yield put(getAssigneesFailure('Unable to connect to the server.'));
  }
}

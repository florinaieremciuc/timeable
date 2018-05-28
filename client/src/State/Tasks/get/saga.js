import { put, call } from 'redux-saga/effects';
import { getTasksSuccess, getTasksFailure } from './actions';
import { getTasks } from '../../../services/Api';

/**
 * Yield a call to the API for getting the tasks list.
 * @param {*} Action payload that contains the `name` field
 */
export default function* getTasksSaga(team) {
  try {
    const response = yield call(getTasks, team.teamid);
    if (response && response.error) {
      yield put(getTasksFailure(response));
    } else if (response && Array(response)) {
      yield put(getTasksSuccess(response));
    } else {
      yield put(getTasksFailure('Unable get tasks.'));
    }
  } catch (e) {
    yield put(getTasksFailure('Unable to connect to the server.'));
  }
}

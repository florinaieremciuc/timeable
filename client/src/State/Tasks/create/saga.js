import { put, call } from 'redux-saga/effects';
import { createTaskSuccess, createTaskFailure } from './actions';
import { createTask } from '../../../services/Api';

/**
 * Yield a call to the API for creating a task.
 * @param {*} Action payload that contains the `name` field
 */
export default function* createTaskSaga({
  name,
  description,
  estimate,
  priority,
  status,
  project,
}) {
  try {
    const response = yield call(
      createTask,
      name.toLowerCase(),
      description,
      estimate,
      priority,
      status,
      project,
    );
    if (response && response.errno) {
      yield put(createTaskFailure(response));
    } else if (response && response[0]) {
      yield put(createTaskSuccess(response[0], name, description, estimate, priority, status, project));
    } else {
      yield put(createTaskFailure('Unable to create task, please contact support.'));
    }
  } catch (e) {
    yield put(createTaskFailure('Unable to connect to the server.'));
  }
}

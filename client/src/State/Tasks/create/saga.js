import { put, call } from 'redux-saga/effects';
import { createTaskSuccess, createTaskFailure } from './actions';
import { createTask } from '../../../services/Tasks';

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
  target,
  risk,
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
      target,
      risk,
    );
    if (response && response.errno) {
      yield put(createTaskFailure(response));
    } else if (response && response[0]) {
      yield put(createTaskSuccess(
        response[0],
        name,
        description,
        estimate,
        priority,
        status,
        project,
        target,
        risk,
      ));
    } else {
      yield put(createTaskFailure('Unable to create task, please contact support.'));
    }
  } catch (e) {
    yield put(createTaskFailure('Unable to connect to the server.'));
  }
}

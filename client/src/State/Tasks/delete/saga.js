import { put, call } from 'redux-saga/effects';
import { deleteTaskSuccess, deleteTaskFailure } from './actions';
import { deleteTask } from '../../../services/Api';

/**
 * Yield a call to the API for deleting a task.
 * @param {*} Action payload that contains the `id` field
 */
export default function* deleteTaskSaga({ id }) {
  try {
    const response = yield call(deleteTask, id);
    // verify if the authentication was successful
    if (response && response.ok) {
      yield put(deleteTaskSuccess(response.ok));
    } else if (response && !response.ok) {
      yield put(deleteTaskFailure(response));
    } else {
      yield put(deleteTaskFailure('Unable to delete, please contact support.'));
    }
  } catch (e) {
    yield put(deleteTaskFailure('Unable to connect to the server.', e));
  }
}

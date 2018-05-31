import { takeEvery } from 'redux-saga/effects';
import getMembersSaga from './saga';
import { GET_MEMBERS_REQUEST } from './actions';

/**
 * Watches for GET_MEMBERS_REQUEST action type asynchronously
 */
export default function* watchGetMembersAttempt() {
  yield takeEvery(GET_MEMBERS_REQUEST, getMembersSaga);
}

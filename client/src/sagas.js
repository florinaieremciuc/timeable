import { fork } from 'redux-saga/effects';

import watchGetTeamsAttempt from './State/Teams/get/watcher';
import watchCreateTeamAttempt from './State/Teams/create/watcher';
import watchRegisterAttempt from './State/Users/register/watcher';
import watchLoginAttempt from './State/Users/login/watcher';

// start the daemons
export default function* root() {
  yield fork(watchGetTeamsAttempt);
  yield fork(watchCreateTeamAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

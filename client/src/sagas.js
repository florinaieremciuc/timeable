import { fork } from 'redux-saga/effects';

import watchGetProjectAttempt from './State/Projects/get/watcher';
import watchCreateProjectAttempt from './State/Projects/create/watcher';
import watchGetTeamsAttempt from './State/Teams/get/watcher';
import watchCreateTeamAttempt from './State/Teams/create/watcher';
import watchRegisterAttempt from './State/Users/register/watcher';
import watchLoginAttempt from './State/Users/login/watcher';

// start the daemons
export default function* root() {
  yield fork(watchGetProjectAttempt);
  yield fork(watchCreateProjectAttempt);
  yield fork(watchGetTeamsAttempt);
  yield fork(watchCreateTeamAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

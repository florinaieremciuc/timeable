import { fork } from 'redux-saga/effects';

import watchDeleteProjectAttempt from './State/Projects/delete/watcher';
import watchGetProjectsAttempt from './State/Projects/get/watcher';
import watchCreateProjectAttempt from './State/Projects/create/watcher';
import watchGetTeamsAttempt from './State/Teams/get/watcher';
import watchCreateTeamAttempt from './State/Teams/create/watcher';
import watchRegisterAttempt from './State/Users/register/watcher';
import watchLoginAttempt from './State/Users/login/watcher';

// start the daemons
export default function* root() {
  yield fork(watchDeleteProjectAttempt);
  yield fork(watchGetProjectsAttempt);
  yield fork(watchCreateProjectAttempt);
  yield fork(watchGetTeamsAttempt);
  yield fork(watchCreateTeamAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

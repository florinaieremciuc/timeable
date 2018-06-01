import { fork } from 'redux-saga/effects';

import {
  watchUpdateAssigneeAttempt,
  watchUpdateStatusAttempt,
  watchUpdateDurationAttempt,
} from './State/Tasks/update/watcher';
import watchDeleteTaskAttempt from './State/Tasks/delete/watcher';
import watchGetTaskAttempt from './State/Tasks/get/watcher';
import watchCreateTaskAttempt from './State/Tasks/create/watcher';

import watchDeleteProjectAttempt from './State/Projects/delete/watcher';
import watchGetProjectsAttempt from './State/Projects/get/watcher';
import watchCreateProjectAttempt from './State/Projects/create/watcher';

import watchGetTeamsAttempt from './State/Teams/get/watcher';
import watchCreateTeamAttempt from './State/Teams/create/watcher';

import watchRegisterAttempt from './State/Users/register/watcher';
import watchLoginAttempt from './State/Users/login/watcher';
import watchGetMembersAttempt from './State/Users/team/watcher';
import watchGetUserAttempt from './State/Users/user/watcher';

// start the daemons
export default function* root() {
  yield fork(watchUpdateDurationAttempt);
  yield fork(watchUpdateStatusAttempt);
  yield fork(watchUpdateAssigneeAttempt);

  yield fork(watchDeleteTaskAttempt);
  yield fork(watchGetTaskAttempt);
  yield fork(watchCreateTaskAttempt);

  yield fork(watchDeleteProjectAttempt);
  yield fork(watchGetProjectsAttempt);
  yield fork(watchCreateProjectAttempt);

  yield fork(watchGetTeamsAttempt);
  yield fork(watchCreateTeamAttempt);

  yield fork(watchGetUserAttempt);
  yield fork(watchGetMembersAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

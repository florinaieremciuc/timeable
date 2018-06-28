import { fork } from 'redux-saga/effects';

import watchCreateRiskAttempt from './State/Risks/create/watcher';
import watchGetRisksAttempt from './State/Risks/get/watcher';
import watchDeleteRiskAttempt from './State/Risks/delete/watcher';

import {
  watchUpdateAssigneeAttempt,
  watchUpdateStatusAttempt,
  watchUpdateDurationAttempt,
} from './State/Tasks/update/watcher';
import watchDeleteTaskAttempt from './State/Tasks/delete/watcher';
import { watchGetTasksAttempt, watchGetAssignedTasksAttempt } from './State/Tasks/get/watcher';
import watchCreateTaskAttempt from './State/Tasks/create/watcher';

import watchDeleteProjectAttempt from './State/Projects/delete/watcher';
import { watchGetProjectsAttempt, watchGetUserProjectsAttempt } from './State/Projects/get/watcher';
import watchCreateProjectAttempt from './State/Projects/create/watcher';

import watchGetTeamAttempt from './State/Teams/get/watcher';
import watchCreateTeamAttempt from './State/Teams/create/watcher';

import watchRegisterAttempt from './State/Users/register/watcher';
import watchLoginAttempt from './State/Users/login/watcher';
import watchGetMembersAttempt from './State/Users/team/watcher';
import watchGetAssigneesAttempt from './State/Users/assignees/watcher';
import watchGetUserAttempt from './State/Users/user/watcher';

// start the daemons
export default function* root() {
  yield fork(watchCreateRiskAttempt);
  yield fork(watchGetRisksAttempt);
  yield fork(watchDeleteRiskAttempt);

  yield fork(watchUpdateDurationAttempt);
  yield fork(watchUpdateStatusAttempt);
  yield fork(watchUpdateAssigneeAttempt);

  yield fork(watchDeleteTaskAttempt);
  yield fork(watchGetAssignedTasksAttempt);
  yield fork(watchGetTasksAttempt);
  yield fork(watchCreateTaskAttempt);

  yield fork(watchDeleteProjectAttempt);
  yield fork(watchGetProjectsAttempt);
  yield fork(watchGetUserProjectsAttempt);
  yield fork(watchCreateProjectAttempt);

  yield fork(watchGetTeamAttempt);
  yield fork(watchCreateTeamAttempt);

  yield fork(watchGetUserAttempt);
  yield fork(watchGetAssigneesAttempt);
  yield fork(watchGetMembersAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

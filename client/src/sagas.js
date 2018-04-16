import { fork } from "redux-saga/effects";

import watchCreateTeamAttempt from "./views/NewTeam/watcher";
import watchRegisterAttempt from "./views/Register/watcher";
import watchLoginAttempt from "./views/Login/watcher";

// start the daemons
export default function* root() {
  yield fork(watchCreateTeamAttempt);
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

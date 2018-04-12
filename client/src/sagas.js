import { fork } from "redux-saga/effects";

import watchRegisterAttempt from "./views/Register/watcher";
import watchLoginAttempt from "./views/Login/watcher";

// start the daemons
export default function* root() {
  yield fork(watchRegisterAttempt);
  yield fork(watchLoginAttempt);
}

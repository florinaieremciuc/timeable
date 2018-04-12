import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import sagas from "./sagas";
import registrationsStatus from "./views/Register/reducers";
import user from "./views/Login/reducers";

const history = createHistory();
const defaultState = {
  registrationsStatus: {
    attempting: 0,
    successMessage: null,
    errorMessage: null
  },
  user: {
    data: null,
    sync: null
  },
  form: {}
};

const rootReducer = combineReducers({
  registrationsStatus,
  user,
  form: formReducer
  // registerForm: formReducer,
  // loginForm: formReducer
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  defaultState,
  compose(applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)))
);
sagaMiddleware.run(sagas);

export { history };
export default store;

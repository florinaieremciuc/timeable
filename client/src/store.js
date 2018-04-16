import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import sagas from "./sagas";
import team from "./views/NewTeam/reducer";
import registrationsStatus from "./views/Register/reducers";
import user from "./views/Login/reducers";

const history = createHistory();
const defaultState = {
  team: {
    data: null,
    sync: null
  },
  registrationsStatus: {
    attempting: 0,
    successMessage: null,
    errorMessage: null
  },
  user: {
    data: null,
    sync: null
  }
  // form: {}
};

const rootReducer = combineReducers({
  team,
  registrationsStatus,
  user
  // form: formReducer
  // registerForm: formReducer,
  // loginForm: formReducer
});

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  defaultState,
  applyMiddleware(sagaMiddleware, logger, routerMiddleware(history))
);
sagaMiddleware.run(sagas);
let persistor = persistStore(store);

export { history };
export { store, persistor };
